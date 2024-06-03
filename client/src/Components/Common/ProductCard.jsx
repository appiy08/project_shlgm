import { Button, Card, Image, Rate, Select, Space, Typography } from "antd";
import PropTypes from "prop-types";
// End Imports
const { Text } = Typography;
const { Option } = Select;

const ProductCard = ({
  product,
  selectedColor,
  handleColorChange,
  selectedSize,
  handleSizeChange,
}) => {
  return (
    <Card hoverable cover={<Image src={product.imageUrl} alt={product.name} />}>
      <Card.Meta
        title={<a href="#">{product.name}</a>}
        description={
          <div>
            <Rate allowHalf defaultValue={product.rating} disabled />
            {product.reviews} {product.reviews > 1 ? "reviews" : "review"}
          </div>
        }
      />
      <div style={{ marginTop: 16 }}>
        {product.discount > 0 && (
          <Text type="danger" style={{ textDecoration: "line-through" }}>
            Rs. {product.originalPrice.toFixed(2)}
          </Text>
        )}
        <Text style={{ fontSize: 20 }}>Rs. {product.price.toFixed(2)}</Text>
      </div>
      <Space style={{ marginTop: 16 }}>
        {product.colors &&
          product.colors.map((color) => (
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
        {product.sizes && (
          <Select
            defaultValue={product.sizes[0]}
            value={selectedSize}
            onChange={handleSizeChange}
            style={{ width: 120 }}
          >
            {product.sizes.map((size) => (
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
