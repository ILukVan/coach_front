import React from 'react';
import { Button, Form, Input } from 'antd';
import { instance } from '../request';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendKey, veryfyKey } from './store/slice/signIn/restoreBool';

const RestoreProfile = () => {
    useEffect(() => {

    }, [])


    const onFinish = async (values) => {
        console.log(values);
        // const email = await instance.post("/restore_profile", values);
        try {
            const email = await instance.post("/restore_profile", values);
            console.log("есть мыло");

        } catch {
            console.log("нет мыла");
        }

      };

    return (
  <Form
    name="restore"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
  >

    <Form.Item
      name="email"
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
  
     <Form.Item       
     name="verifyCode"
     label="verifyCode">

      <Input />
    </Form.Item>
    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
}
export default RestoreProfile;