import React, { useState } from 'react';
import { List, Modal, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import dayjs from 'dayjs';

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
    title="Список посещенных тренировок"
    open={isModalOpen}
    onOk={handleOk}
    okText="Сохранить"
    cancelText="Отменить"
    onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel}>
        Закрыть
      </Button>,
    ]}
  >
    <p>Всего посещено: {visitedtTrains.length}</p>
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
{dayjs(item.start_time_train).format("DD.MM.YYYY HH:mm")} {item.type_of_training} 
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