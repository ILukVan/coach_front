import React from "react";
import { Button, Card, Form, Input } from "antd";

const RestoreEmail = ({ sendEmailCode }) => {
  const onFinish = async (values) => {
    sendEmailCode(values);
  };

  return (
    <Form
      name="restore"
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Подтвердить
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RestoreEmail;
