import React, { useState } from "react";
import { Button, Modal, Form, notification, Input } from "antd";

const { TextArea } = Input;

const ModalEditWorkOut = ({ record, updateWorkOut }) => {
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
    values.workout_id = record.workout_id;
    try {
      await updateWorkOut(values);
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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Редактировать тренировку
      </Button>
      <Modal
        title="Basic Modal"
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
          style={{
            maxWidth: 600,
          }}
          initialValues={
            {
              ...record,
              type_of_workout: record.type_of_workout,
              description_of_workout: record.description_of_workout,
            }
            // remember: true,
          }
          // initialValue={record.occupancy_train}   // Ошибка DOM
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Тип тренировки" name="type_of_workout">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="Описание тренировки" name="description_of_workout">
            <TextArea allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEditWorkOut;
