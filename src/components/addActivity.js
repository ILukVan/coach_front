import React from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  DatePicker,
} from "antd";
// import dayjs from 'dayjs';
import { useState } from "react";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onChangeDate = (date, dateString) => {
  console.log(date);
  console.log(dateString);
};

const onChangeTime = (time, timeString) => {
  console.log(time);
  console.log(timeString);
};

const AddActivity = ({ createActivity }) => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const onCreate = (values) => {
    // console.log('Received values of form: ', values);
    // const d = values.Date.unix()
    // const a = values.time[0].unix()
    // const a2 = values.time[0].format('HH/mm')
    // const b = values.time[1].unix()
    // const b2 = values.time[1].format('HH/mm')
    // const d2 = values.Date.format('DD/MM/YYYY')
    // console.log(a, "начало времени");
    // console.log(a2, "начало времени");
    // console.log(b, "конец времени");
    // console.log(b2, "конец времени");
    // console.log(d, "дата");
    // console.log(d2, "дата");

    createActivity(values);
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
            initialValues={{
              modifier: "public",
            }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item name="Date">
          <DatePicker onChange={onChangeDate} />
        </Form.Item>
        <Form.Item name="time">
          <TimePicker.RangePicker
            format="HH:mm"
            onChange={onChangeTime}
            needConfirm={false}
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Максимальное количество клиентов на занятии "
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <p> Тип занятия </p>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Select
            defaultValue="Растяжка"
            style={{
              width: 120,
            }}
            onChange={handleChange}
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
