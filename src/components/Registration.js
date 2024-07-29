import React from 'react';
import { Button, Form, Input, DatePicker, Checkbox, Collapse} from 'antd';
import { useEffect } from "react";
import { MaskedInput } from "antd-mask-input";
import dayjs from 'dayjs';
const Registration = ( {phone_number ,registration} ) => {
  const [form] = Form.useForm();
const onFinish = (values) => {

    registration(values)
  };
  const onFinishFailed = (errorInfo) => {

  };

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Telegram', 'WhatsApp'];

  useEffect(() => {
    form.setFieldsValue({
      phone_number: phone_number,
    });
  }, [form]);

 function verifyEmail(value) {
  console.log(value);
  return false
 }

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
          whitespace: true,
          message: 'Введите Ваше отчество!',
          
        },
        {
          max: 15,
          message: "Предел символов",
        }, 
      ]}
      normalize={(value) => value.replace(/[^а-яА-я]/gu, "").trim()}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="Email"
      label="Email"
      rules={[
        {
          type: 'email',
          whitespace: true,
          message: "Некорректный Email!",
        },
      ]}
      normalize={(value) => value.trim()}
      onFinish={verifyEmail}
    >
      <Input />
    </Form.Item>     
    <Form.Item
      name="client_job"
      label="Ваша профессия"
      
    >
      <Input />
    </Form.Item>
    <Form.Item name="client_illness" label="Ваши жалобы">
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
      <Form.Item name="phone_number" label="Номер телефона" 
      rules={[
        {
          required: true,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {

            const phoneNumber = value.length-value.replace(/\d/gm,'').length;

            if (phoneNumber < 11) {

              return Promise.reject(new Error('Некорректный номер телефона!'));
            } else {
              return Promise.resolve();
            }
            
          },
        }),
      ]}
      disabled>
        <MaskedInput mask="+{7}(000)-000-00-00" disabled/>
      </Form.Item>

    <Form.Item
      label="Пароль"
      name="client_password"
      rules={[
        {
          min: 3,
          message: "Минимальная длинна пароля 3 символа",
        }, 
        {
          required: true,
          whitespace: true,
          message: 'Введите Ваш пароль!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const re = new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{3,}', 'g');
            

            if (value.match(re)) {
              return Promise.resolve();
            }
            console.log();
            return Promise.reject(new Error('Пароль должен содержать хотя бы одну цифру, латинскую строчную и заглавную букву, и спецсимвол(!@#$%^&*) !'));
          },
        }),
      ]}
      normalize={(value) => value.trim()}
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
          whitespace: true,
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

      normalize={(value) => value.trim()}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Имя"
      name="client_name"
      rules={[
        {
          required: true,
          whitespace: true,
          message: 'Введите Ваше имя!',
        },
        {
          max: 15,
          message: "Предел символов",
        }, 
      ]}
      normalize={(value) => value.replace(/[^а-яА-я]/gu, "").trim()}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Фамилия"
      name="client_surname"
      rules={[
        {
          required: true,
          whitespace: true,
          message: 'Введите Вашу фамилию!',
        },
        {
          max: 15,
          message: "Предел символов",
        }, 
      ]}
      normalize={(value) => value.replace(/[^а-яА-я]/gu, "").trim()}
    >
      <Input />
    </Form.Item>


    <Form.Item
      name="client_birthday"
      label="Дата рождения"

    >
       <DatePicker 
           minDate={dayjs(dayjs().subtract(75, 'year'))}
           maxDate={dayjs(dayjs().subtract(2, 'year'))}/>
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