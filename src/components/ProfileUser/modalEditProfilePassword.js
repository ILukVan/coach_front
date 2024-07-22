import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  notification,
  Input,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
dayjs.extend(customParseFormat);




const ModalEditProfilePassword = ({ updatePassword, idClient}) => {
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
        await updatePassword(values)
        notification.success({
          message: "Успех!",
          description: "Данные успешно обновлены",
            });
        setIsModalOpen(false);
      }
      // $2b$10$83bTKLWiBNBrAQGihyOHYuIZe7z/kMEfY/1y9ryhxpPm4aPtvWOsS
      // $2b$10$83bTKLWiBNBrAQGihyOHYuIZe7z/kMEfY/1y9ryhxpPm4aPtvWOsS
      // $2b$10$uqpIW6tSlMLYi9BIZyspS.ICqtrVUopwNxGwDtC5MnJMKQW4ST69S
    } catch {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось обновить данные",
      });
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

        </Form>
      </Modal>
    </>
  );
};
export default ModalEditProfilePassword;
