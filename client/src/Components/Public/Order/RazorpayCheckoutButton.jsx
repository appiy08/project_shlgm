import { Button, message } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { verifyPayment } from "../../../features/order/orderSlice";
import { getCartData } from "../../../features/cart/cartSlice";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { filter, get, toString } from "lodash";
import { useEffect, useState } from "react";
// Dependencies End
// Code Begin
const RazorpayCheckoutButton = ({ userId, addressId }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);
  const addresses = useSelector((state) => get(state, "address.data", []));
  const { auth_credentials } = useAuthContext();
  const [address, setAddress] = useState({});

  useEffect(() => {
    function getSelectedAddress() {
      filter(addresses, (data) => {
        if (get(data, "_id", "") === addressId) {
          setAddress(data);
          return data;
        }
      });
    }
    getSelectedAddress();
  }, [addressId, addresses]);

  const handlePayment = async () => {
    try {
      // Fetch order details from the server
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}order/create`,
        {
          userId,
          addressId,
        }
      );

      if (data.error) {
        alert(data.error);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your Razorpay Key ID
        amount: data.order.amount,
        currency: "INR",
        name: "Celestial Chic",
        description: "Test Transaction",
        image: "http://localhost:5173/public/brand-logo/cc_shlgm_logo.png",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            // Send payment response to the server for verification
            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_BASE_URL}order/verify-payment`,
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.status === "success") {
              message.success("Payment successful");
              dispatch(verifyPayment(verifyResponse.data));
              dispatch(getCartData({ userId }));
            } else {
              message.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            message.error("Payment verification failed");
          }
        },
        prefill: {
          name: get(auth_credentials, "name", ""),
          email: get(auth_credentials),
          contact: get(address, "phone", ""),
        },
        notes: {
          address: toString(address),
        },
        theme: {
          color: "#E09540",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Error creating order");
    }
  };

  return (
    <Button
      type="primary"
      size="large"
      block
      onClick={handlePayment}
      loading={orderState.loading}
    >
      Pay with Razorpay
    </Button>
  );
};

RazorpayCheckoutButton.propTypes = {
  userId: PropTypes.string.isRequired,
  addressId: PropTypes.string.isRequired,
};

export default RazorpayCheckoutButton;
