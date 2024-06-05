import { Button, Card, Image, Rate, Select, Space, Typography } from "antd";
import { get, map } from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
      <div style={{ marginTop: 16 }}>
        {product.discount > 0 && (
          <Text type="danger" style={{ textDecoration: "line-through" }}>
            Rs. {get(product, "originalPrice", 0)}
          </Text>
        )}
        <Text style={{ fontSize: 20 }}>Rs. {get(product, "price", 0)}</Text>
      </div>
      <Space style={{ marginTop: 16 }}>
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
      </Space>
      <Button type="primary" block style={{ marginTop: 16 }}>
        Add to Cart
      </Button>
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
