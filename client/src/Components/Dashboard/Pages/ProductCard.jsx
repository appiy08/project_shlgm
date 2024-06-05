import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row, Typography } from "antd";
import { get } from "lodash";
import PropTypes from "prop-types";
// End Imports
const { Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={
        <Image
          alt={get(product, "name", "") + "image"}
          src={get(product, "images[0]", "")}
          style={{ width: "100%" }}
        />
      }
    >
      <Card.Meta
        title={get(product, "name", "")}
        description={
          <Row>
            <Col span={24}>
              <Text style={{ fontSize: 20 }}>
                Rs. {get(product, "price", 0)}
              </Text>
            </Col>
            <Col span={24} style={{ marginTop: "0.5rem" }}>
              <Row gutter={[16, 16]} justify={"space-between"}>
                <Col span={12}>
                  <Text>
                    Stock: <Text strong>{get(product, "stock", 0)}</Text>
                  </Text>
                </Col>
                <Col span={12} style={{textAlign:'end'}}>
                  <Button icon={<EditOutlined />} />
                </Col>
              </Row>
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
