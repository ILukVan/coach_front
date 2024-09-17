import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  notification,
  Input,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MaskedInput } from "antd-mask-input";
import { useSelector } from "react-redux";
dayjs.extend(customParseFormat);




const ModalUpdateSubscription = ({ updateSubscription, idClient}) => {
  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);


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
      await updateSubscription(values);
      
      notification.success({
        message: "Успех!",
        description: "Данные успешно обновлены",
      });
      setIsModalOpen(false);
    } catch (err){

      notification.error({
        message: "Ошибка!",
        description: err.response.data,
      });
    }
  };



  return (
    <>
      <Button type="primary" onClick={showModal}>
        Абонемент
      </Button>
      <Modal
        title="Управление абонементами"
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
            label="Абонемент"
            name="client_pass"
            rules={[
              {
                required: true,
                message: "Введите максимальное количество человек на занятии!",
              },
            ]}
          >
            <InputNumber min={-8} max={17}/>
          </Form.Item>

         
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateSubscription;
