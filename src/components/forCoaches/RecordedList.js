import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Space, List, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { instance } from "../../request";

const RecordedList = ({ record }) => {
  useEffect(() => {
    getClientList();
  }, []);

  const getClientList = async () => {
    const clients = await instance.get("/client_list");

    setClientList(clients.data);
  };
  const [form] = Form.useForm();
  const [clientList, setClientList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Option } = Select;

  const onCreate = async (values) => {
    console.log(values);
    values.training_id = record.training_id;
    console.log(values);
    const data = await instance.post("/sign_up_train_coach", values);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={isModalOpen}
        title="Добавить новую тренировку"
        okText="Добавить"
        cancelText="Отменить"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => setIsModalOpen(false)}
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
        <List
          itemLayout="horizontal"
          dataSource={record.recorded_client}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta title={<a href="#">{item}</a>} />
            </List.Item>
          )}
        />

        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name]}
                    rules={[
                      {
                        required: true,
                        message: "Missing first name",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                    >
                      {clientList.map((item) => (
                        <Option
                          key={item.client_id}
                          value={`${item.client_surname} ${item.client_name} ${
                             item.client_patronymic !== null
                              ? item.client_patronymic
                              : ""
                          }`}
                          label={`${item.client_surname} ${item.client_name} ${
                            item.client_patronymic !== null
                              ? item.client_patronymic
                              : ""
                          }`}
                        ></Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить человека
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Modal>
    </>
  );
};
export default RecordedList;
