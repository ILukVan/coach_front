import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const DeleteWorkOut = ({ record, deleteWorkOut }) => {


const showDeleteConfirm = () => {
  confirm({
    title: 'Вы уверены, что хотите удалить тренировку?',

 
    okText: 'Да',
    okType: 'danger',
    cancelText: 'Нет',
    onOk() {
      deleteWorkOut(record.workout_id)
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

export default DeleteWorkOut;