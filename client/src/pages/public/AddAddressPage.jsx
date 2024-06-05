import { Form, Input, Button, Row, Col, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddAddressPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
    // Add address to database or API
  };

  return (
    <Row justify="center">
      <Col xs={24} md={18} lg={12}>
        <Card title="Add Address" bordered={false}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter your address" />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="Enter your city" />
            </Form.Item>
            <Form.Item label="State" name="state">
              <Input placeholder="Enter your state" />
            </Form.Item>
            <Form.Item label="Zip" name="zip">
              <Input placeholder="Enter your zip" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Address
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default AddAddressPage;