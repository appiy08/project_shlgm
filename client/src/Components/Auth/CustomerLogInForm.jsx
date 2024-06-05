import { Button, Form, Input, notification } from "antd";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { userLogin } from "../../lib/actions/auth";
import { createCookie } from "../../lib/Session";
// End Imports

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

const CustomerLogInForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const openNotificationWithIcon = (notifyData) => {
    api[notifyData?.type]({
      message: notifyData?.title,
      description: notifyData?.message,
    });
  };

  const onSubmit = (values) => {
    userLogin(values)
      .then((result) => {
        if (get(result, "status", "")) {
          dispatch({ type: "SIGNUP", payload: get(result, "data.data", {}) });
          createCookie("auth_credentials", get(result, "data.data", {}));
          openNotificationWithIcon({
            type: "success",
            title: "Success",
            message: get(result, "message", "Login Successfully"),
          });
          navigate("/");
        } else {
          openNotificationWithIcon({
            type: "error",
            title: "Error",
            message: get(result, "message", "Something went wrong"),
          });
        }
      })
      .catch((err) => {
        openNotificationWithIcon({
          type: "error",
          title: "Error",
          message: get(err, "response.error", "Something went wrong"),
        });
        throw err;
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        layout="vertical"
        form={form}
        name="signup"
        onFinish={onSubmit}
        initialValues={{
          role: "customer",
        }}
        requiredMark={false}
        scrollToFirstError
      >
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
              message: "Please enter your E-mail!",
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
              message: "Please enter your password!",
            },
            {
              min: 8,
              message: "The password was not less than 8 characters",
            },
            {
              max: 32,
              message: "The password was not large than 32 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CustomerLogInForm;
