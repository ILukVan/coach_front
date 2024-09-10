import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  InputNumber,
  TimePicker,
  notification,
  Input,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Option } = Select;

const ModalEditConstructor = ({
  record,
  updateConstructorActivity,
  workoutList,
}) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setValueStartTime(`2024-12-06 ${record.start_time_train}`)
    setValueHour(`2024-12-06 ${record.start_time_train}`)
  };
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setValueHour(`2024-12-06 ${record.start_time_train}`)
    setIsModalOpen(false);

  };
  const onFinish = async (values) => {
    values.training_id = record.training_id;
    try {
      await updateConstructorActivity(values);
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


  const [valueHour, setValueHour] = useState();
  const [valueStartTime, setValueStartTime] = useState();
  // ---------------------------------------------- функция добавления часа к значению конца тренировки------------------
  function changeEndTime(start_time) {
    setValueHour(start_time);
    const start = dayjs(start_time);
    const end = start.add(1, "hour");
    form.setFieldValue("end_time_train", dayjs(end));
    setValueStartTime(start_time)
  }
  // ---------------------------------------------- функция добавления часа к значению конца тренировки------------------
  //  ----------------------------- функция оключения предыдущих значений часов--------------------
  const disabledHours = () => {
    const hours = [];
    const currentHour = dayjs(valueHour).hour();

    for (let i = 0; i < currentHour; i++) {
      hours.push(i);
    }

    return hours;
  };
  //  ----------------------------- функция оключения предыдущих значений часов--------------------
  // ------------------------------- функция минимального времени тренировки ----------------------
  const onChangeEnd = (time) => {

    if (dayjs(time)< dayjs(valueStartTime).add(15, "minute")) {

      form.setFieldValue("end_time_train", dayjs(valueStartTime).add(15, "minute")) 
    }

  };

    // ------------------------------- функция минимального времени тренировки ----------------------
  

    return (
    <>
      <Button type="primary" onClick={showModal}>
        Редактировать тренировку
      </Button>
      <Modal
        title="Редактор тренировки"
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
          clearOnDestroy
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={
            {
              ...record,
              start_time_train: dayjs(`2024-12-06 ${record.start_time_train}`),
              end_time_train: dayjs(`2024-12-06 ${record.end_time_train}`),
              weekday_train: record.weekday_train,
            }

          }

          onFinish={onFinish}

          autoComplete="off"
        >
          <p>{record.weekday_train}</p>
          <Form.Item name="weekday_train" hidden>
          <Input disabled/>
        </Form.Item>
          <Form.Item label="Начало тренировки" name="start_time_train">
            <TimePicker
              changeOnScroll
              needConfirm={false}
              format="HH:mm"
              minuteStep={5}
              onChange={changeEndTime}
              allowClear={false}
            />
          </Form.Item>

          <Form.Item label="Конец тренировки" name="end_time_train">
            <TimePicker
              changeOnScroll
              needConfirm={false}
              format="HH:mm"
              allowClear={false}
              onChange={onChangeEnd}
              minuteStep={5}
              disabledTime={(value) => ({
                disabledHours,
              })}
            />
          </Form.Item>

          <Form.Item
          name="occupancy_train"
          label="Максимальное количество клиентов на занятии "
          rules={[
            {
              required: true,
              message: "Введите максимальное количество человек на занятии!",
            },
          ]}
        >
          <InputNumber min={1} max={17} />
        </Form.Item>

        <Form.Item
          name="type_of_training"
          className="collection-create-form_last-form-item"
          rules={[{ required: true, message: "Введите тип тренировки!" }]}
        >
          <Select placeholder="Выберите тип занятия" style={{ width: "100%" }}>
            {workoutList.map((item) => (
              <Option
                key={item.workout_id}
                value={item.type_of_workout}
                label={item.type_of_workout}
              ></Option>
            ))}
          </Select>
        </Form.Item>


        </Form>
      </Modal>
    </>
  );
};
export default ModalEditConstructor;
