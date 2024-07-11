import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const MakeCoach = ({ record, createCoach }) => {


const showEditConfirm = () => {
  confirm({
    title: `Вы уверены, что хотите сделать ${record.client_surname} ${record.client_name} трененром?`,

 
    okText: 'Да',
    okType: 'danger',
    cancelText: 'Нет',
    onOk() {

      createCoach(record)
    },
    onCancel() {

    },
  });
};

return (      

  <Button onClick={showEditConfirm} >
  
      Сделать тренером
  </Button>
)
};

export default MakeCoach;