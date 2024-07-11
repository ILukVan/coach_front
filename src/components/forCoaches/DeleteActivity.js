import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const DeleteActivity = ({ record, deleteActivity }) => {

// const onClick = () => {
    
//     console.log(record.training_id)
// }

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
      console.log('Cancel');
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