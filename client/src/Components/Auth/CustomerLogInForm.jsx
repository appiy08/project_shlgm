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
            ...get(result, "data", {}),
          });
          navigate("/");
        } else {
          openNotificationWithIcon({
            type: "error",
            title: "Error",
            ...get(result, "data", {}),
          });
        }
      })
      .catch((err) => {
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
          role: "buyer",
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
