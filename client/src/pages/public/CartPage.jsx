import { Button, Card, Col, Flex, Image, message, Row, Typography } from "antd";
import { get, isEmpty, map } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, removeCartItem } from "../../features/cart/cartSlice";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { MinusOutlined } from "@ant-design/icons";
// End Dependencies
const { Title, Paragraph } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth_credentials } = useAuthContext();
  const cartItems = useSelector((state) => state.cart.data);
  const subtotal = cartItems.reduce((total, item) => {
    return total + get(item, "itemId.price", 0) * get(item, "quantity", 0);
  }, 0);

  const handleRemoveItem = (itemId) => {
    const values = { userId: get(auth_credentials, "_id", ""), itemId: itemId };
    dispatch(removeCartItem(values));
    message.success("Cart Item Removed");
  };

  useEffect(() => {
    dispatch(getCartData({ userId: get(auth_credentials, "_id", "") }));
  }, [auth_credentials, dispatch]);

  return (
    <Card style={{ margin: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Col xs={24} lg={{ span: 12 }}>
            <Title level={2} className="playfair-display-bold">
              Cart
            </Title>
          </Col>
        </Col>
      </Row>
      <Row justify="center">
        {!isEmpty(cartItems) ? (
          <Col xs={24}>
            <Card title="Shopping Cart" bordered={false}>
              {map(cartItems, (item, index) => (
                <Card
                  key={`${index}_${get(item, "_id", "")}`}
                  className="cart-item-card"
                >
                  <Row key={item.id} gutter={[12, 12]} align="middle">
                    <Col xs={24} md={8} lg={4}>
                      <Image
                        src={get(item, "itemId.images[0]", "")}
                        alt="product_image"
                        height={100}
                      />
                    </Col>
                    <Col xs={24} md={16} lg={20}>
                      <Row gutter={[12, 12]}>
                        <Col xs={24}>{get(item, "itemId.name", "")}</Col>
                        <Col xs={8} lg={4}>
                          x{get(item, "quantity", "")}
                        </Col>
                        <Col xs={8} lg={4}>
                          ₹{get(item, "itemId.price", 0)}
                        </Col>
                        <Col xs={8} lg={4}>
                          ₹
                          {get(item, "itemId.price", 0) *
                            get(item, "quantity", 0)}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {console.log("item >>>", item)}
                  <Button
                    onClick={() =>
                      handleRemoveItem(get(item, "itemId._id", ""))
                    }
                    type="default"
                    icon={<MinusOutlined />}
                    className="cart-item-remove-btn"
                  />
                </Card>
              ))}
              <Row justify="end" style={{ marginTop: "1rem" }}>
                <Col xs={24} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Flex gap={12}>
                    <Typography.Text strong>Subtotal:</Typography.Text>
                    <Typography.Text>₹{subtotal}</Typography.Text>
                  </Flex>
                </Col>
              </Row>
              <Row justify="end" style={{ marginTop: "2rem" }}>
                <Col xs={24} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Button
                    type="primary"
                    block
                    onClick={() =>
                      navigate("/address", {
                        state: {
                          userId: get(auth_credentials, "_id", ""),
                          subtotal: subtotal,
                        },
                      })
                    }
                  >
                    Proceed to Checkout
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ) : (
          <Col span={24}>
            <Card style={{ textAlign: "center" }}>
              <Paragraph>No item added to cart</Paragraph>
              <Button
                type="primary"
                size="small"
                onClick={() => navigate("/products")}
              >
                Checkout Products
              </Button>
            </Card>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default CartPage;
