import React from 'react';
import { Button, Form, Input, DatePicker, Checkbox, Collapse} from 'antd';
import { useEffect } from "react";
import { MaskedInput } from "antd-mask-input";

const Registration = ( {phone_number ,registration} ) => {
  const [form] = Form.useForm();
const onFinish = (values) => {
    console.log('Success:', values);
    registration(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Telegram', 'WhatsApp'];

  useEffect(() => {
    form.setFieldsValue({
      phone_number: phone_number,
    });
  }, [form]);



  const items = [
    {
      key: '1',
      label: 'Чтобы лучше Вас почувствовать',
      children:<div> 
    <Form.Item
      name="client_patronymic"
      label="Отчество"
      rules={[
        {
          message: 'Введите Ваше отчество!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="Email"
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
      name="client_job"
      label="Ваша профессия"

    >
      <Input />
    </Form.Item>
    <Form.Item name="client_illness" label="Ваши болезни">
      <Input.TextArea />
    </Form.Item>
  </div>
    },
  ]
  
  return (
    
      <Form
    name="basic"
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
    form={form}

  >
      <Form.Item name="phone_number" label="Номер телефона">
        <MaskedInput mask="+{7}(000)-000-00-00" />
      </Form.Item>

    <Form.Item
      label="Пароль"
      name="client_password"
      rules={[
        {
          required: true,
          message: 'Введите Ваш пароль!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Повторите пароль"
      name="rePassword"
      dependencies={['client_password']}
      rules={[
        {
          required: true,
          message: 'Введите Ваш пароль!',
        },
          ({ getFieldValue }) => ({
            validator(_, value) {

              if (!value || getFieldValue('client_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Имя"
      name="client_name"
      rules={[
        {
          required: true,
          message: 'Введите Ваше имя!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Фамилия"
      name="client_surname"
      rules={[
        {
          required: true,
          message: 'Введите Вашу фамилию!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      name="client_birthday"
      label="Дата рождения"

    >
       <DatePicker />
    </Form.Item>




    <Form.Item 
          name="client_messenger"
          label="Способы связи"
    
    >
    <CheckboxGroup options={plainOptions} />
    </Form.Item>
    <Collapse items={items} />
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
  </Form>

  );
};
export default Registration;