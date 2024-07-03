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
      console.log('OK');
      console.log(record.training_id);
      deleteActivity(record.training_id)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

return (      

  <Button onClick={showDeleteConfirm} >
  
      Удалить тренирову
  </Button>
)
};

export default DeleteActivity;