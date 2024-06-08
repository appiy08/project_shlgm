import { Button, Col, Flex, Input, message, Row, Select } from "antd";
import { capitalize, get, map } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
// End Imports
const { Option } = Select;

const AddToCartBtnBox = ({ productId, sizes, colors }) => {
  const { auth_credentials } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor] = React.useState(get(colors, "[0]", ""));

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleAddToCart = () => {
    if (get(auth_credentials, "_id", "")) {
      const formData = {
        userId: get(auth_credentials, "_id", ""),
        itemId: productId,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      };
      dispatch(addToCart(formData))
        .then((result) => {
          if (get(result, "payload.status", 0) === 200) {
            message.success(`Added ${quantity} items to cart`);
          }
        })
        .catch((err) => {
          message.error(`Something went wrong`);
          throw err;
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <Flex vertical align="center" gap={8} style={{ width: "100%" }}>
      <Row>
        <Col>
          <Select
            defaultValue={selectedSize}
            value={selectedSize}
            onChange={handleSizeChange}
          >
            {map(sizes, (item, index) => (
              <Option key={index} value={item}>
                {capitalize(item)}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Flex gap={8}>
        <Row>
          <Col>
            <Button
              onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : null)}
              style={{fontSize:'1.25rem',fontWeight:'300'}}
            >
              -
            </Button>
          </Col>
          <Col>
            <Input
              value={quantity}
              style={{ width: 40, textAlign: "center" }}
            />
          </Col>
          <Col>
            <Button
              onClick={() => (quantity < 10 ? setQuantity(quantity + 1) : null)}
              style={{fontSize:'1.25rem',fontWeight:'300'}}
            >
              +
            </Button>
          </Col>
        </Row>
        <Button type="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  );
};

AddToCartBtnBox.propTypes = {
  productId: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  colors: PropTypes.string.isRequired,
};

export default AddToCartBtnBox;
