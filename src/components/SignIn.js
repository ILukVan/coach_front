import React from "react";
import { Button, Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { useEffect } from "react";

const SingIn = ( {phone_number ,signIn} ) => {

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    signIn(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      phone_number: phone_number,
    });
  }, [form]);

  return (
    <Form
      form={form}
      name="SignIn"
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
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Введите пароль!",
          },
        ]}
      >
        <Input.Password />
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
  );
};
export default SingIn;
