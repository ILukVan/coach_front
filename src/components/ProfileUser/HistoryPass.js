import React, { useState } from 'react';
import { List, Modal, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import dayjs from 'dayjs';

const ContainerHeight = 150;
const HistoryPass = ({getHistoryPass, historyPass}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
      setIsModalOpen(true);
      getHistoryPass()
    };
    const handleOk = () => {
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };



return (
  <>
  <Button type="primary" onClick={showModal}>
    История абонементов
  </Button>
  <Modal
    title="История абонементов"
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
  <List>
    <VirtualList
      data={historyPass}
      height={ContainerHeight}
      itemHeight={47}
      itemKey="id"

    >
      {(item) => (
        <List.Item key={item.id}>
<p>
{dayjs(item.createdAt).format("DD.MM.YYYY")}  добавлено занятий: {item.history_client_pass} 
</p>      
        </List.Item>
      )}
    </VirtualList>
  </List>
  </Modal>
  </>
);
};
export default HistoryPass;