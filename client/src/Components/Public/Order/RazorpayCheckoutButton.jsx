import { Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { verifyPayment } from "../../../features/order/orderSlice";
// Dependencies End 
// Code Begin 
const RazorpayCheckoutButton = ({ userId, addressId }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);

  const handlePayment = async () => {
    try {
      // Fetch order details from the server
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}order/create`, {
        userId,
        addressId,
      });

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
              `${import.meta.env.VITE_BASE_URL}/verify-payment`,
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.status === "success") {
              alert("Payment successful");
              dispatch(verifyPayment(verifyResponse.data));
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order");
    }
  };

  return (
    <Button type="primary" size="large" block onClick={handlePayment} loading={orderState.loading}>
      Pay with Razorpay
    </Button>
  );
};

RazorpayCheckoutButton.propTypes = {
  userId: PropTypes.string.isRequired,
  addressId: PropTypes.string.isRequired,
};

export default RazorpayCheckoutButton;
