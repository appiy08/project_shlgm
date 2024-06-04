import { CreditCardOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Row } from 'antd';
import React from 'eact';

const PaymentPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
    // Process payment
  };

  return (
    <Row justify="center">
      <Col xs={24} md={18} lg={12}>
        <Card title="Payment" bordered={false}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Card Number" name="cardNumber">
              <Input placeholder="Enter your card number" />
            </Form.Item>
            <Form.Item label="Expiration Date" name="expirationDate">
              <Input placeholder="Enter your expiration date" />
            </Form.Item>
            <Form.Item label="CVV" name="cvv">
              <Input placeholder="Enter your CVV" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<CreditCardOutlined />}>
                Pay Now
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentPage;