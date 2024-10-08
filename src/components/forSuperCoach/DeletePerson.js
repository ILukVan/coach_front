import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const DeletePerson = ({ record, deletePerson }) => {


const showDeleteConfirm = () => {
  confirm({
    title: 'Вы уверены, что хотите удалить ?',

 
    okText: 'Да',
    okType: 'danger',
    cancelText: 'Нет',
    onOk() {

      deletePerson(record.client_id)
    },
    onCancel() {

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