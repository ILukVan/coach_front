import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  InputNumber,
  TimePicker,
  notification,
  Input
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { instance } from "../../request";

dayjs.extend(customParseFormat);


const { Option } = Select;

const ModalEdit = ({ record, updateActivity }) => {
  useEffect(() => {
    getTypeWorkout()
  }, []);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [workoutList, setWorkOutList] = useState([])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const getTypeWorkout = async() =>{
    const type = await instance.get("/workout_list")


    setWorkOutList(type.data)
  } 

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

  const findIndexWorkout = (value) => {
    console.log(value);
    workoutList.forEach( function (train, index) {
      // console.log(train.type_of_workout, index);
      if (train.type_of_workout === value) {
        form.setFieldValue('description', workoutList[index].description_of_workout)
      }

      

    })

    // index

    
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit initialValues
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
              start_time_train: dayjs(record.start_time_train),
              end_time_train: dayjs(record.end_time_train),
              // range_time_train: [
              //   dayjs(record.start_time_train),
              //   dayjs(record.end_time_train),
              // ],
              description: record.description_of_train

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
  <Select placeholder="Выберите тип занятия" style={{ width: '100%' }} onChange={findIndexWorkout}>
        {workoutList.map((item) => (
          <Option
            key={item.workout_id}
            value={item.type_of_workout}
            label={item.type_of_workout}
          >
          </Option>
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
