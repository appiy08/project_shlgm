import { Button, Card, Col, Flex, Image, Row, Typography } from "antd";
import { get, map } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../features/cart/cartSlice";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
// End Dependencies
const { Title } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth_credentials } = useAuthContext();
  const cartItems = useSelector((state) => state.cart.data);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + get(item, "itemId.price", 0) * get(item, "quantity", 0);
  }, 0);

  useEffect(() => {
    dispatch(getCartData({ userId: get(auth_credentials, "_id", "") }));
  }, [auth_credentials, dispatch]);

  return (
    <Card style={{ margin: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Title level={2} className="playfair-display-bold">
              Cart
            </Title>
          </Col>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24}>
          <Card title="Shopping Cart" bordered={false}>
            {map(cartItems, (item, index) => (
              <Card key={`${index}_${get(item, "_id", "")}`}>
                <Row key={item.id} align="middle">
                  <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <Image
                      src={get(item, "itemId.images[0]", "")}
                      alt="product_image"
                      height={100}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 8 }}>
                    {get(item, "itemId.name", "")}
                  </Col>
                  <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                    x{get(item, "quantity", "")}
                  </Col>
                  <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                    ₹{get(item, "itemId.price", 0)}
                  </Col>
                  <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                    ₹{get(item, "itemId.price", 0) * get(item, "quantity", 0)}
                  </Col>
                </Row>
              </Card>
            ))}
            <Row justify="end" style={{ marginTop: "1rem" }}>
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                <Flex gap={12}>
                  <Typography.Text strong>Subtotal:</Typography.Text>
                  <Typography.Text>₹{totalPrice}</Typography.Text>
                </Flex>
              </Col>
            </Row>
            <Row justify="end" style={{ marginTop: "2rem" }}>
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                <Button
                  type="primary"
                  block
                  onClick={() => navigate("/address")}
                >
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default CartPage;
