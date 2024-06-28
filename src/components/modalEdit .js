import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  InputNumber,
  TimePicker,
  notification,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const ModalEdit = ({ record, updateActivity }) => {
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
    console.log("Success:", values);
    values.training_id = record.training_id;
    try {
      await updateActivity(values);
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
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit initialValues
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        okText="Cancel"
        cancelText="Ok"
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
              start_time_train: dayjs(record.start_time_train),
              end_time_train: dayjs(record.end_time_train),
              range_time_train: [
                dayjs(record.start_time_train),
                dayjs(record.end_time_train),
              ],
            }
            // remember: true,
          }
          // initialValue={record.occupancy_train}   // Ошибка DOM
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* <Form.Item label="Время тренировки" name="range_time_train">
            <TimePicker.RangePicker format="HH:mm" needConfirm={false} />
          </Form.Item> */}

          <Form.Item label="Начало тренировки" name="start_time_train">
            <TimePicker changeOnScroll needConfirm={false} format="HH:mm" />
          </Form.Item>

          <Form.Item label="Конец тренировки" name="end_time_train">
            <TimePicker changeOnScroll needConfirm={false} format="HH:mm" />
          </Form.Item>

          <Form.Item label="Вместимость" name="occupancy_train">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Тип тренировки" name="type_of_training">
            <Select
              options={[
                {
                  value: "индивидуальное занятие",
                  label: "индивидуальное занятие",
                },
                {
                  value: "растяжка",
                  label: "растяжка",
                },
                {
                  value: "барре",
                  label: "барре",
                },
                {
                  value: "йога",
                  label: "йога",
                },
                {
                  value: "фит микс",
                  label: "фит микс",
                },
                {
                  value: "стрип пластика",
                  label: "стрип пластика",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEdit;
