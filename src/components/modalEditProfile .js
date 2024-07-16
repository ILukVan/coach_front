import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  notification,
  Input,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MaskedInput } from "antd-mask-input";
import { useSelector } from "react-redux";
dayjs.extend(customParseFormat);




const ModalEditProfile = ({ record, updateProfile}) => {
  const name = useSelector((state) => state.rootReducer.sign.user.name);

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
      await updateProfile(values);
      
      notification.success({
        message: "Успех!",
        description: "Данные успешно обновлены",
      });
      setIsModalOpen(false);
    } catch {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось обновить данные",
      });
    }
  };

  // function verifyId() {
  //   if (record.client_id !== id){
  //     return "disable"
  //   }
  // } 

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Редактировать данные
      </Button>
      <Modal
        title="Редактирование данных"
        open={isModalOpen}
        onOk={handleOk}
        okText="Сохранить"
        cancelText="Отменить"
        onCancel={handleCancel}

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

          initialValues={
            {
              ...record,
              client_birthday: dayjs(record.client_birthday),
            }
          }

          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="client_phone_number" label="Номер телефона">
            <MaskedInput mask="+{7}(000)-000-00-00" disabled={record.client_fio !== name}/>
          </Form.Item>

          <Form.Item
            label="Имя"
            name="client_name"
            rules={[
              {
                required: true,
                message: "Введите Ваше имя!",
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
                message: "Введите Вашу фамилию!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="client_patronymic"
            label="Отчество"
            rules={[
              {
                message: "Введите Ваше отчество!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="client_birthday" label="Дата рождения">
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="client_email"
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="client_job" label="Ваша профессия">
            <Input />
          </Form.Item>
          <Form.Item name="client_illness" label="Ваши болезни">
            <Input.TextArea />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};
export default ModalEditProfile;
