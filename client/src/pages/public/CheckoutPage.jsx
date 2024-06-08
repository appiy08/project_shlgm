import { Card, Col, Flex, Image, Row, Typography } from "antd";
import RazorpayCheckoutButton from "../../Components/Public/Order/RazorpayCheckoutButton";
import { useLocation } from "react-router-dom";
import RichText from "../../Components/Common/RichText";
import { filter, get, map } from "lodash";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// Dependencies End
const { Title, Text } = Typography;

const CheckoutPage = () => {
  const { state } = useLocation();
  const addresses = useSelector((state) => get(state, "address.data", []));
  const cartItems = useSelector((state) => get(state, "cart.data", []));
  const [address, setAddress] = useState({});

  useEffect(() => {
    const getAddress = () => {
      return filter(addresses, (data) => {
        if (get(data, "_id", "") === get(state, "addressId", "")) {
          setAddress(data);
        }
        return get(data, "_id", "") === get(state, "addressId", "");
      });
    };
    getAddress();
  }, [addresses, state]);

  return (
    <Card bordered={false}>
      <Row justify="center" gap={[24, 24]}>
        <Col span={24}>
          <Title level={2} className="playfair-display-bold">
            Payment
          </Title>
        </Col>
        <Col xs={24} md={18} lg={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Title level={4} className="playfair-display-bold">
                  Address
                </Title>
                <Card>
                  <Row gutter={[12, 3]}>
                    <Col span={24}>
                      <Title level={5} style={{ marginBottom: 0 }}>
                        {get(address, "name", "")},{" "}
                      </Title>
                    </Col>
                    <Col span={24}>
                      <Text>{get(address, "address", "")}, </Text>
                      <Text>{get(address, "city", "")}, </Text>
                    </Col>
                    <Col span={24}>
                      <Text>{get(address, "state", "")}, </Text>
                      <Text>{get(address, "country", "")}, </Text>
                      <Text>{get(address, "zip", "")}, </Text>
                    </Col>
                    <Col span={24}>
                      <Text>Phone: {get(address, "phone", "")}, </Text>
                    </Col>
                  </Row>
                </Card>
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Title level={4} className="playfair-display-bold">
                  Your Cart
                </Title>
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
                        ₹
                        {get(item, "itemId.price", 0) *
                          get(item, "quantity", 0)}
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18} lg={12}>
          <div>
            <Title level={4} className="playfair-display-bold">
              Order Summary
            </Title>
            <Flex gap={12} justify="space-between" align="center">
              <Text>Bag Total</Text>
              <RichText price={get(state, "subtotal", 0)} currency="inr" />
            </Flex>
            <Flex gap={12} justify="space-between" align="center">
              <Text>Bag Discount</Text>
              <RichText price={0} currency="inr" />
            </Flex>
            <Flex gap={12} justify="space-between" align="center">
              <Text>Delivery Fee</Text>
              <RichText price={99} currency="inr" />
            </Flex>
            <Flex
              gap={12}
              justify="space-between"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <Title
                level={4}
                style={{ color: "var(--ant-color-primary-text)" }}
              >
                Order Total
              </Title>
              <RichText
                price={get(state, "subtotal", 0)}
                currency="inr"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--ant-color-primary-text)",
                  textAlign: "end",
                }}
              />
            </Flex>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <RazorpayCheckoutButton
              userId={get(state, "userId", "")}
              addressId={get(state, "addressId", "")}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CheckoutPage;
