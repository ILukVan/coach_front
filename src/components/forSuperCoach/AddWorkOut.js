import React from "react";
import {
  Button,
  Form,
  Input,
  Modal,
} from "antd";
import { useState } from "react";



const AddWorkOut = ({createWorkOut}) => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const onCreate = (values) => {

    createWorkOut(values);
    setOpen(false);
  };


  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Добавить тренировку
      </Button>

      <Modal
        open={open}
        title="Добавить новую тренировку"
        okText="Добавить"
        cancelText="Отменить"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"

            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="type_of_workout"
          label="Виид тренировки"
          rules={[
            {
              required: true,
              message: "Введите тип тренировки",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description_of_workout"
          label="Описание тренировки "
          rules={[
            {
              required: true,
              message: "Введите тип тренировки!",
            },
          ]}
        >
          <Input />
        </Form.Item>

      </Modal>
    </>
  );
};

export default AddWorkOut;
