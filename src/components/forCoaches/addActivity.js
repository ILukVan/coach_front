import React from "react";
import {
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  DatePicker,

} from "antd";
import { useState } from "react";
import dayjs from 'dayjs';


const disabledDate = (current) => {
  // Can not select days before today and today
  return current < dayjs().startOf('date');
}

const { Option } = Select;

const AddActivity = ({ createActivity, date, workoutList }) => {

  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);


  const onCreate = (values) => {

    createActivity(values);
    setOpen(false);
  };

  const [valueHour, setValueHour] = useState(null);
  const onChange = (time) => {
    setValueHour(time)
    const start = dayjs(time)
    const end = start.add(1, "hour")
    form.setFieldValue("end_time_train", dayjs(end))  
  };
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
      <Button type="primary" onClick={() => { setOpen(true);}}>
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
            initialValues={{

              weekday_train: dayjs(date.date),
              start_time_train: dayjs("09:00", "HH:mm"),
              end_time_train: dayjs("10:00", "HH:mm"),
              occupancy_train: 1,

            }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item name="weekday_train">
          <DatePicker disabledDate={disabledDate} disabled/>
        </Form.Item>

        <Form.Item label="Начало тренировки" name="start_time_train">
            <TimePicker
              changeOnScroll
              needConfirm={false}
              format="HH:mm"
              value={valueHour}
              minuteStep={5}
        onChange={onChange}
            />
          </Form.Item>

        <Form.Item name="end_time_train" label="Конец тренировки" >
          <TimePicker
            format="HH:mm"
            needConfirm={false}
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
          <InputNumber min={1} max={17}/>
        </Form.Item>
        <p> Тип занятия </p>
        <Form.Item
          name="type_of_training"
          className="collection-create-form_last-form-item"
          rules={[{ required: true, message: 'Введите тип тренировки!' }]}
        >
  <Select placeholder="Выберите тип занятия" style={{ width: '100%' }} >
        {(workoutList).map((item) => (
          <Option
            key={item.workout_id}
            value={item.type_of_workout}
            label={item.type_of_workout}
          >
          </Option>
        ))}
      </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default AddActivity;
