import React from "react";
import { Button, Form, Input, Layout, notification, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { instance } from "../../request";

const NewPassword = () => {

  const [form] = Form.useForm();

  const emailCurrent = localStorage.getItem("email");
  const onFinish = async (values) => {
    try {
      updatePassword(values)
      notification.success({
        message: "Пароль обновлен!",
      });
    } catch {
      notification.error({
        message: "Неверный пароль!",
      });
      form.setFields([
        {
          name: 'old_client_password',
          errors: ["Неверный пароль"],
        },
      ]);
    }
   
  };
  const { Content } = Layout;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // ---------------------------------------изменить пароль ----------------------------
  const updatePassword = async (values) => {
    const newPass = {
      client_password: values.client_password,
      client_email: emailCurrent,
    }

    try {
    await instance.put("/restore_password", newPass);
    navigate("/sign");
    localStorage.clear();
    } catch {
      console.log("неуспех");
    }
  };
  // ---------------------------------------изменить пароль ----------------------------

  return (
    <Layout>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Form
            name="newPassword"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >

            <Form.Item
              label="Пароль"
              name="client_password"
              rules={[
                {
                  required: true,
                  message: "Введите Ваш пароль!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Повторите пароль"
              name="rePassword"
              dependencies={["client_password"]}
              rules={[
                {
                  required: true,
                  message: "Введите Ваш пароль!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("client_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
export default NewPassword;
