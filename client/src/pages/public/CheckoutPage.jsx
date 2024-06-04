import React from 'eact';
import { Row, Col, Card, Button, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const CheckoutPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Product 1',
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 9.99,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Row justify="center">
      <Col xs={24} md={18} lg={12}>
        <Card title="Checkout" bordered={false}>
          <Row align="middle">
            <Col span={12}>
              <Typography.Text strong>Subtotal:</Typography.Text>
              <Typography.Text>${subtotal}</Typography.Text>
            </Col>
            <Col span={12}>
              <Button type="primary" block>
                Proceed to Payment
              </Button>
            </Col>
          </Row>
          <Row justify="end">
            <Col span={12}>
              <Typography.Text>
               <CheckOutlined />
                Add a new address
              </Typography.Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutPage;