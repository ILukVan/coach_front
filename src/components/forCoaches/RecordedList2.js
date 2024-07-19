import React, { useState} from "react";
import { Button, Modal, List, Select } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const { confirm } = Modal;
const RecordedList2 = ({ record, getClientList, clientList, recordedList, deleteClient, addClient}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Option } = Select;


  const handleChange = async (value, key) => {
    

    await addClient(value, key, record.training_id)
    setIsOpen(!isOpen)
  };


  const showDeleteConfirm = (client_id) => {

    confirm({
      title: 'Вы уверены, что хотите удалить человека с тренировки?',
  
   
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteClient(client_id, record.training_id)
      },
      onCancel() {
      },
    });
  };



  function addClientToList() {
    if ((dayjs().format("YYYY-MM-DD") <= dayjs(record.end_time_train).format("YYYY-MM-DD"))) {
    if (isOpen) {
      return  <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      onChange={handleChange}
    >
    
      {clientList.map((item) => (
        <Option
          key={item.client_id}
          value={item.client_fio}
          label={item.client_fio}
        ></Option>
      ))}
    </Select>
      
    } else {
      return <Button  type="dashed"     style={{
        width: '100%',
      }} onClick={() => setIsOpen(!isOpen)}>Добавить человека</Button>
    }
  }
  }

  return (
    <>
      <Button type="primary" onClick={() => {setIsModalOpen(true); getClientList(record);} }>
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
        <p>Вместимость тренировки {(recordedList || []).length}/{record.occupancy_train}</p>
        <List
          itemLayout="horizontal"
          dataSource={recordedList}
          
          renderItem={(item, index) => (
            <List.Item   actions={[<Button onClick={() => showDeleteConfirm(item.client_id)}>Удалить</Button>]}>
              <List.Item.Meta title={<Link to="/management/client">{item.client_fio}</Link>} />
            </List.Item>
           
          )} 
          >
            {(recordedList || []).length < record.occupancy_train && addClientToList()}
        </List>

       
      </Modal>
    </>
  );
};
export default RecordedList2;

// onClick={() => deleteClient(item.client_id, record.training_id)