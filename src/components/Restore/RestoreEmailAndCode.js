import React from "react";
import { Button, Form, Input } from "antd";

const RestoreEmailAndCode = ({
  restoreEmail,
  reSendEmailCode,
  sendCodeAndEmail,
}) => {
  const emailCurrent = localStorage.getItem("email");
  const onFinish = async (values) => {
    sendCodeAndEmail(values);
  };

  return (
    <div className="email-veryfycode">
      <div>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          name="restore"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            initialValue={emailCurrent}
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="verifyCode" label="Код восстановления">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
        <Button onClick={() => reSendEmailCode(emailCurrent)} >
        Отправить код еще раз
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};
export default RestoreEmailAndCode;
