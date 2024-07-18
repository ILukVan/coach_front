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

const ModalEdit = ({ record, updateActivity, workoutList }) => {
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

// --------------------------------------- функция синхронизации типа тренировки с описанием-------------------- 
  const findIndexWorkout = (value) => {
    workoutList.forEach(function (train, index) {

      if (train.type_of_workout === value) {
        form.setFieldValue(
          "description",
          workoutList[index].description_of_workout
        );
      }
    });
  };
  // --------------------------------------- функция синхронизации типа тренировки с описанием-------------------- 
  const [valueHour, setValueHour] = useState(null);
// ---------------------------------------------- функция добавления часа к значению конца тренировки------------------
  function  changeEndTime(start_time) {
    setValueHour(start_time)
    const start = dayjs(start_time)
    const end = start.add(1, "hour")
    form.setFieldValue("end_time_train", dayjs(end))  
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
              start_time_train: dayjs(record.start_time_train),
              end_time_train: dayjs(record.end_time_train),
              // range_time_train: [
              //   dayjs(record.start_time_train),
              //   dayjs(record.end_time_train),
              // ],
              description: record.description_of_train,
            }
            // remember: true,
          }
          // initialValue={record.occupancy_train}   // Ошибка DOM
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Начало тренировки" name="start_time_train">
            <TimePicker changeOnScroll needConfirm={false} format="HH:mm" onChange={changeEndTime}/>
          </Form.Item>

          <Form.Item label="Конец тренировки" name="end_time_train">
            <TimePicker changeOnScroll needConfirm={false} format="HH:mm"  disabledTime={(value) => ({
              disabledHours,
            })}/>
          </Form.Item>

          <Form.Item label="Вместимость" name="occupancy_train">
            <InputNumber min={1} max={17} />
          </Form.Item>

          <Form.Item label="Тип тренировки" name="type_of_training">
            <Select
              placeholder="Выберите тип занятия"
              style={{ width: "100%" }}
              onChange={findIndexWorkout}
            >
              {workoutList.map((item) => (
                <Option
                  key={item.workout_id}
                  value={item.type_of_workout}
                  label={item.type_of_workout}
                ></Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Описание тренировки" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEdit;
