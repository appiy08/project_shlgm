import React from 'eact';
import { Row, Col, Card, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const CartPage = () => {
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
        <Card title="Shopping Cart" bordered={false}>
          {cartItems.map((item) => (
            <Row key={item.id} align="middle">
              <Col span={6}>{item.name}</Col>
              <Col span={4}>x{item.quantity}</Col>
              <Col span={4}>${item.price}</Col>
              <Col span={4}>${item.price * item.quantity}</Col>
              <Col span={4}>
                <Button type="link" icon={<ShoppingCartOutlined />} />
              </Col>
            </Row>
          ))}
          <Row justify="end">
            <Col span={12}>
              <Typography.Text strong>Subtotal:</Typography.Text>
              <Typography.Text>${subtotal}</Typography.Text>
            </Col>
          </Row>
          <Row justify="end">
            <Col span={12}>
              <Button type="primary" block>
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;