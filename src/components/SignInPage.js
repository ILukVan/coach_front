import React from "react";
import { useState } from "react";
import { Button, Form, Layout, theme, notification } from "antd";
import { MaskedInput } from "antd-mask-input";
import axios from "axios";
import SingIn from "./SignIn";
import Registration from "./Registration";
import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";
import { login } from "./store/slice/signIn";


const SignInPage = () => {
  const navigate = useNavigate();
  const [phone_number, setPhoneNumber] = useState([]);
  const [user, setUser] = useState([""]);

  const SignInOrRegistration = async (values) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_Api_url}/SignInOrRegistration`,
        values
      );

      setUser(data.data);

    } catch {
      notification.error({
        message: "Введите номер телефона!",
      });
    }
  };
  const dispatch = useDispatch();

  const signIn = async (values) => {
    try {

      const data = await axios.post(`${process.env.REACT_APP_Api_url}/signIn`, values);
      if (data.status === 200) {
       
        localStorage.setItem("tokens", JSON.stringify(data.data));
        dispatch(login());
        navigate("/");
      }
    }
    catch (err) {
      notification.error({
        message: "Неверный пароль!",
      });
    }
  }

  const registration = async (values) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_Api_url}/registration`,
        values
      );
      localStorage.setItem("tokens", JSON.stringify(data.data));
      dispatch(login());
      navigate("/");
    } catch (err) {
      notification.error({
        message: "Ошибка!",
        description: err.response.data,
      });

    }
  };

  const onFinish = (values) => {
    SignInOrRegistration(values);
    setPhoneNumber(values.phone_number);
  };
  const onFinishFailed = (errorInfo) => {};
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
              <Form.Item
                name="phone_number"
                label="Номер телефона"
                rules={[
                  {
                    required: true,
                    message: "Введите Ваш номер телефона!",
                  },
                ]}
              >
                <MaskedInput mask="+{7}(000)-000-00-00" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Продолжить
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Link to={"/restore"}>Восстановить пароль</Link>
              </Form.Item>
            </Form>
          )}


        </div>
      </Content>
    </Layout>
  );
};

export default SignInPage;
