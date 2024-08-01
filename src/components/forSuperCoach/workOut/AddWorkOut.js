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
          label="Тип тренировки"
          rules={[
            {
              required: true,
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

      </Modal>
    </>
  );
};

export default AddWorkOut;
