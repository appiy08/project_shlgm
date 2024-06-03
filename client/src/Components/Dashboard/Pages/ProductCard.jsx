import { Card, Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
// End Imports
const { Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={
        <img alt="example" src={product.image} style={{ width: "100%" }} />
      }
    >
      <Card.Meta
        title={product.name}
        description={
          <Row>
            <Col span={24}>
              <Text style={{ fontSize: 20 }}>
                Rs. {product.price}
              </Text>
            </Col>
            <Col span={24} style={{marginTop:'0.5rem'}}>
              <Text>
                Stock: <Text strong>{product.stock}</Text>
              </Text>
              <Text> | </Text>
              <Text>
                Stock: <Text strong>{product.stock}</Text>
              </Text>
            </Col>
          </Row>
        }
      />
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
