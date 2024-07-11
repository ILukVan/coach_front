import React, { useState} from "react";
import { Button, Modal, List, Select } from "antd";
import { Link } from "react-router-dom";


const RecordedList2 = ({ record, getClientList, clientList, recordedList, deleteClient, addClient}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Option } = Select;


  const handleChange = async (value, ) => {
    await addClient(value, record.training_id)
    setIsOpen(!isOpen)
  };


  return (
    <>
      <Button type="primary" onClick={() => {setIsModalOpen(true); getClientList(record)}}>
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
            <List.Item   actions={[<Button onClick={() => deleteClient(item, record.training_id)}>Удалить</Button>]}>
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
