import React, { useState } from "react";
import { Button, Modal, Form, notification, Input } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
dayjs.extend(customParseFormat);

const ModalEditProfilePassword = ({ updatePassword, idClient }) => {
  const id = useSelector((state) => state.rootReducer.sign.user.id);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    try {
      if (idClient === id) {
        await updatePassword(values);
        notification.success({
          message: "Успех!",
          description: "Данные успешно обновлены",
        });
        setIsModalOpen(false);
      }

    } catch {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось обновить данные",
      });
      form.setFields([
        {
          name: 'old_client_password',
          errors: ["Неверный пароль"],
        },
      ]);
    }
  };



  return (
    <>
      <Button type="primary" onClick={showModal}>
        Изменить пароль
      </Button>
      <Modal
        title="Смена пароля"
        open={isModalOpen}
        onOk={handleOk}
        okText="Сохранить"
        cancelText="Отменить"
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          clearOnDestroy
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Старый пароль"
            name="old_client_password"
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
            label="Новый пароль"
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
        </Form>
      </Modal>
    </>
  );
};
export default ModalEditProfilePassword;
