import React, { useState, useEffect } from "react";
import { Button, Modal, Space, List, Select } from "antd";
import { Link } from "react-router-dom";
import { instance } from "../../request";

const RecordedList2 = ({ record }) => {
  useEffect(() => {
    getClientList();
  }, []);

  const getClientList = async () => {
    console.log(record, "--------------------------sdgsdgsdg------------");

    const clients = await instance.post("/client_list_for_coach", record);

    setClientList(clients.data.difference);
    setRecordedList(clients.data.recorded);
  };

  const [clientList, setClientList] = useState([]);
  const [recordedList, setRecordedList] = useState(record.recorded_client);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Option } = Select;

  const deleteClient = async (value) => {
    const dataUnSign = {
      client: value,
      training_id: record.training_id,
    }
    const data = await instance.post("/unsign_up_train_coach", dataUnSign);
    setClientList(data.data.difference);
    setRecordedList(data.data.recorded);
  } 
  const handleChange = async (value) => {
    const dataSign = {
      client: value,
      training_id: record.training_id,
    }
    const data = await instance.post("/sign_up_train_coach", dataSign);
    setClientList(data.data.difference);
    setRecordedList(data.data.recorded);
    setIsOpen(!isOpen)
  };


  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Список записавшихся
      </Button>
      <Modal
        open={isModalOpen}
        title="Список записавшихся клиентов"
        okText="Добавить"
        cancelText="Отменить"
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={recordedList}
          
          renderItem={(item, index) => (
            <List.Item   actions={[<Button onClick={() => deleteClient(item)}>Удалить</Button>]}>
              <List.Item.Meta title={<Link to="/management/client">{item}</Link>} />
            </List.Item>
           
          )} 
          >

        {isOpen ?  <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                      onChange={handleChange}
                    >
                      {clientList.map((item) => (
                        <Option
                          key={item}
                          value={item}
                          label={item}
                        ></Option>
                      ))}
                    </Select> : <Button  type="dashed"     style={{
      width: '100%',
    }} onClick={() => setIsOpen(!isOpen)}>Добавить человека</Button>}
        </List>

       
      </Modal>
    </>
  );
};
export default RecordedList2;
