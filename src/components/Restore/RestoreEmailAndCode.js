import React from "react";
import { Button, Form, Input } from "antd";

const RestoreEmailAndCode = ({
  restoreEmail,
  reSendEmailCode,
  sendCodeAndEmail,
  cancelRestore,
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
          <Form.Item name="verifyCode" label="Код восстановления" 
          rules={[
        {
          required: true,
          whitespace: true,
          message: 'Введите Ваше имя!',
        },
        {
          min: 8,
          message: "Код должен состоять из 8 символов",
        }, 
        {
          max: 8,
          message: "Предел символов",
        }, 
      ]}
      normalize={(value) => value.replace(/[^A-z\d+$]/gu, "").trim()}>
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
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
        <Button onClick={cancelRestore} >
        Отменить восстановление
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};
export default RestoreEmailAndCode;
