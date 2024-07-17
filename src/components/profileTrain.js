import React, { useEffect, useState } from 'react';
import { List, Modal, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { instance } from '../request';
import { useSelector } from 'react-redux';


const ContainerHeight = 150;
const ProfileTrain = () => {
    const id = useSelector((state) => state.rootReducer.sign.user.id);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const appendData = async () => {
    const data = await instance.post("/visited_trains", id);
    setData(data.data);

  // ---------------------------------------создать тренировку ----------------------------
};
useEffect(() => {
    
  appendData();
}, []);


return (
  <>
  <Button type="primary" onClick={showModal}>
    Посещенные тренировки
  </Button>
  <Modal
    title="Редактирование данных"
    open={isModalOpen}
    onOk={handleOk}
    okText="Сохранить"
    cancelText="Отменить"
    onCancel={handleCancel}

  >
  <List>
    <VirtualList
      data={data}
      height={ContainerHeight}
      itemHeight={47}
      itemKey="training_id"

    >
      {(item) => (
        <List.Item key={item.training_id}>
<p>
{item.type_of_training} {item.start_time_train}
</p>      
        </List.Item>
      )}
    </VirtualList>
  </List>
  </Modal>
  </>
);
};
export default ProfileTrain;