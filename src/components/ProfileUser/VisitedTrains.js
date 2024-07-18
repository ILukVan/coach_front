import React, { useState } from 'react';
import { List, Modal, Button } from 'antd';
import VirtualList from 'rc-virtual-list';


const ContainerHeight = 150;
const VisitedTrains = ({visited_workouts, visitedtTrains}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
      setIsModalOpen(true);
      visited_workouts()
    };
    const handleOk = () => {
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };


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
      data={visitedtTrains}
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
export default VisitedTrains;