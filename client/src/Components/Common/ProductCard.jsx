import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  Input,
  message,
  Rate,
  Row,
  Select,
  Typography,
} from "antd";
import { get, isEmpty, map } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
// End Imports
const { Text } = Typography;
const { Option } = Select;

const ProductCard = ({
  product,
  selectedColor,
  handleColorChange,
  selectedSize,
  handleSizeChange,
  ...rest
}) => {
  const { auth_credentials } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(0);

  const handleAddToCart = ({ productId }) => {
    if (get(auth_credentials, "_id", "")) {
      const formData = {
        userId: get(auth_credentials, "_id", ""),
        itemId: productId,
        quantity: quantity,
        size: selectedSize,
        color: !isEmpty(selectedColor)
          ? selectedColor
          : get(product, "colors[0]", ""),
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
    <Card
      {...rest}
      hoverable
      cover={
        <Image
          src={get(product, "images[0]")}
          alt={get(product, "name", "image")}
        />
      }
      className="product-card"
    >
      <Card.Meta
        title={
          <Link to={`/products/${get(product, "_id", "")}`}>
            {get(product, "name", "")}
          </Link>
        }
        description={
          <div>
            <Rate allowHalf defaultValue={get(product, "rating", 0)} disabled />
            {get(product, "reviews", 0)}{" "}
            {get(product, "reviews") > 1 ? "reviews" : "review"}
          </div>
        }
      />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <div style={{ marginTop: 16 }}>
            {product.discount > 0 && (
              <Text type="danger" style={{ textDecoration: "line-through" }}>
                Rs. {get(product, "originalPrice", 0)}
              </Text>
            )}
            <Text style={{ fontSize: 20 }}>Rs. {get(product, "price", 0)}</Text>
          </div>
        </Col>
        <Col span={24}>
          {get(product, "colors", []) &&
            map(get(product, "colors", []), (color) => (
              <Button
                key={color}
                onClick={() => handleColorChange(color)}
                size="small"
                shape="circle"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  backgroundColor: color,
                  border:
                    color === selectedColor
                      ? `0.125rem solid #353839`
                      : `0.125rem solid transparent`,
                }}
              />
            ))}
        </Col>
        <Col span={12}>
          <Flex align="middle">
            <Button
              size="small"
              onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : null)}
              style={{ fontSize: "1.25rem", fontWeight: "300" }}
            >
              -
            </Button>
            <Input
              size="small"
              value={quantity}
              style={{ maxWidth: 40, textAlign: "center" }}
            />
            <Button
              size="small"
              onClick={() => (quantity < 10 ? setQuantity(quantity + 1) : null)}
              style={{ fontSize: "1.25rem", fontWeight: "300" }}
            >
              +
            </Button>
          </Flex>
        </Col>
        <Col span={12}>
          {get(product, "sizes", []) && (
            <Select
              defaultValue={get(product, "sizes[0]")}
              value={selectedSize}
              onChange={handleSizeChange}
              style={{ width: 120 }}
            >
              {map(get(product, "sizes"), (size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          )}
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            block
            style={{ marginTop: 16 }}
            onClick={() =>
              handleAddToCart({ productId: get(product, "_id", "") })
            }
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  selectedColor: PropTypes.string.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  selectedSize: PropTypes.string.isRequired,
  handleSizeChange: PropTypes.func.isRequired,
};
export default ProductCard;
