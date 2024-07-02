import React from "react";
import { useState } from "react";
import { Button, Form, Layout, theme, notification } from "antd";
import { MaskedInput } from "antd-mask-input";
import axios from "axios";
import SingIn from "./SignIn";
import Registration from "./Registration";

import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const navigate = useNavigate();
  const [phone_number, setPhoneNumber] = useState([]);
  const [user, setUser] = useState([""]);

  const SignInOrRegistration = async (values) => {
    const data = await axios.post(
      "http://localhost:3500/SignInOrRegistration",
      values
    );
    setUser(data.data);
  };

  const signIn = async (values) => {
    const data = await axios.post("http://localhost:3500/signIn", values);
    console.log(data.data);
    localStorage.setItem("tokens", JSON.stringify(data.data));
    navigate("/");
  };

  const registration = async (values) => {
    const data = await axios.post("http://localhost:3500/registration", values);
    console.log(data, "<-------------- после регистрации");
    if (data.statusText === "OK") {
      console.log("da");
      navigate("/profile")
    } else {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось зарегистрировать",
      });
    }
  };

  const onFinish = (values) => {
    SignInOrRegistration(values);
    setPhoneNumber(values.phone_number);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Content } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          {user[0] !== "" ? (
            user === "sign" ? (
              <SingIn phone_number={phone_number} signIn={signIn} />
            ) : (
              <Registration
                registration={registration}
                phone_number={phone_number}
              />
            )
          ) : (
            <Form
              name="SingOrRegistrathion"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="phone_number" label="Номер телефона">
                <MaskedInput mask="+{7}(000)-000-00-00" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default SignInPage;
