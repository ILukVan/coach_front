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

const AddActivity = ({ createActivity }) => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const onCreate = (values) => {
    console.log(values);
    createActivity(values);
    setOpen(false);
  };

  const [valueHour, setValueHour] = useState(null);
  const onChange = (time) => {
    setValueHour(time);

  };

  const disabledHours = () => {
    const hours = [];
    const currentHour = dayjs(valueHour).hour();

    for (let i = 0; i < currentHour; i++) {
      hours.push(i);
    }

    return hours;
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
            // initialValues={{

            //   start_time_train: dayjs('09:00', 'HH:mm'),

            // }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item name="weekday_train">
          <DatePicker disabledDate={disabledDate}/>
        </Form.Item>

        <Form.Item label="Начало тренировки" name="start_time_train">
            <TimePicker
              changeOnScroll
              needConfirm={false}
              format="HH:mm"
              value={valueHour}
        onChange={onChange}
            />
          </Form.Item>

        <Form.Item name="end_time_train" label="Конец тренировки" >
          <TimePicker
            format="HH:mm"
            needConfirm={false}
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
              message: "Please input the title of collection!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <p> Тип занятия </p>
        <Form.Item
          name="type_of_training"
          className="collection-create-form_last-form-item"
        >
          <Select

            style={{
              width: 120,
            }}
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
      </Modal>
    </>
  );
};

export default AddActivity;
