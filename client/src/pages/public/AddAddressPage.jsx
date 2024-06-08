import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../features/address/addressSlice";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
// End Dependencies
const { Title } = Typography;

const AddAddressPage = () => {
  const [form] = Form.useForm();
  const { auth_credentials } = useAuthContext();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.address);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formData = {
      userId: get(auth_credentials, "_id", ""),
      address: values,
    };
    // Add address to database or API
    dispatch(addAddress(formData));

    if (status === "succeeded") {
      message.success("Address add successfully");
      navigate("/address");
    } else {
      message.error(error);
    }
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
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Enter your phone number" />
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
                <div style={{ marginTop: "1rem" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    Add Address
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default AddAddressPage;
