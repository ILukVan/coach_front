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
 <Form.Item
          name="type_of_workout"
          label="Тип тренировки"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Введите тип тренировки",
            },
            {
              max: 50,
              message: "Тип тренировки должен быть меннее 50 символов",
            },
          ]}
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          name="description_of_workout"
          label="Описание тренировки "
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Введите тип тренировки!",
            },
            {
              max: 200,
              message: "Описание должно быть меннее 200 символов",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
    
                let counSpace = 0
                for (let char of value){
                  if (char !== " "){
                    counSpace++
                  }
                else if (counSpace < 21 && char === " ") {
                  counSpace=0
                }
                }
    
                if (counSpace > 20) {
    
                  return Promise.reject(new Error('Длинное слово!'));
                } else {
                  return Promise.resolve();
                }
                
              },
            }),
          ]}
        >
           <Input.TextArea maxLength={200} allowClear/>
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEditWorkOut;
