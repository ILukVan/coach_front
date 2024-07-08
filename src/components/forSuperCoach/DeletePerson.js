import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const DeletePerson = ({ record, deletePerson }) => {

// const onClick = () => {
    
//     console.log(record.training_id)
// }

const showDeleteConfirm = () => {
  confirm({
    title: 'Вы уверены, что хотите удалить ?',

 
    okText: 'Да',
    okType: 'danger',
    cancelText: 'Нет',
    onOk() {
      console.log('OK');
      console.log(record.client_id);
      deletePerson(record.client_id)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

return (      

  <Button onClick={showDeleteConfirm} >
  
      Удалить анкету
  </Button>
)
};

export default DeletePerson;