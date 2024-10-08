import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const DeleteActivity = ({ record, deleteActivity }) => {


const showDeleteConfirm = () => {
  confirm({
    title: 'Вы уверены, что хотите удалить тренировку?',

 
    okText: 'Да',
    okType: 'danger',
    cancelText: 'Нет',
    onOk() {
      deleteActivity(record.training_id)
    },
    onCancel() {

    },
  });
};

return (      

  <Button onClick={showDeleteConfirm} >
  
      Удалить тренировку
  </Button>
)
};

export default DeleteActivity;