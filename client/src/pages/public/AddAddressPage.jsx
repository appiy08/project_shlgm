import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { addAddress } from "../../features/address/addressSlice";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
// End Dependencies
const { Title } = Typography;

const AddAddressPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { auth_credentials } = useAuthContext();

  const handleSubmit = (values) => {
    const formData = {
      userId: get(auth_credentials, "_id", ""),
      address: values,
    };
    console.log(formData);
    // Add address to database or API
    dispatch(addAddress(formData));
  };

  return (
    <Card>
      <Row justify="center">
        <Col span={24}>
          <Title level={2} className="playfair-display-bold">
            Add Address
          </Title>
        </Col>
        <Col xs={24} md={18} lg={12}>
          <Card bordered={false}>
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
              <Form.Item label="Country" name="country">
                <Input placeholder="Enter your Country" />
              </Form.Item>
              <Form.Item label="Zip" name="zip">
                <Input placeholder="Enter your zip" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Add Address
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default AddAddressPage;
