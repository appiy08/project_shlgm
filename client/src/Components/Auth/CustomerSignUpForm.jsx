import { Button, Checkbox, Form, Input, notification } from "antd";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { userSignup } from "../../lib/actions/auth";
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

const CustomerSignUpForm = () => {
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
    userSignup(values)
      .then((result) => {
        if (get(result, "status", "")) {
          dispatch({ type: "SIGNUP", payload: get(result, "data", {}) });
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
                  new Error("The new password that you entered do not match!")
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
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CustomerSignUpForm;
