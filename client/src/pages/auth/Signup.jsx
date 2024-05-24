import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { userSignup } from "../../lib/actions/auth";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { get } from "lodash";
// End Imports
const { Title, Paragraph } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};

const Signup = () => {
  const [form] = Form.useForm();
  const { dispatch } = useAuthContext();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (notifyData) => {
    api[notifyData?.type]({
      message: `${notifyData?.message} ${notifyData?.status}`,
      description: notifyData?.message,
    });
  };

  const onSubmit = (values) => {
    console.log("Received values of form: ", values);
    userSignup(values)
      .then((result) => {
        if (get(result, "status", "")) {
          dispatch({ type: "SIGNUP", payload: get(result, "data", {}) });
          openNotificationWithIcon(get(result, "data"));
        } else {
          openNotificationWithIcon(get(result, "data", {}));
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      {contextHolder}
      <div className="auth-container">
        <Row>
          <Col xs={24} md={12}>
            <Row gutter={24} justify={{ xs: "center", md: "start" }}>
              <Col xs={24}>
                <Link to="/" style={{ display: "inline-block" }}>
                  <img
                    alt="Brand_Logo"
                    src="cc_shlgm_logo_full_transparent.png"
                    className="img-fluid auth-container-logo"
                  />
                </Link>
              </Col>
              <Col xs={24}>
                <div className="auth-container-captions">
                  <Title level={1} className="playfair-display-black title">
                    Welcome To Celestial Chic
                  </Title>
                  <Paragraph className="sub-title">
                    Second-Hand Luxury Goods Marketplace
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Form
              {...formItemLayout}
              layout="vertical"
              form={form}
              name="signup"
              onFinish={onSubmit}
              initialValues={{
                role: "buyer",
              }}
              requiredMark={false}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Signup;
