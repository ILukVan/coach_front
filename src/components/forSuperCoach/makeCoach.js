import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;


const MakeCoach = ({ record, createCoach }) => {

// const onClick = () => {
    
//     console.log(record.training_id)
// }

const showDeleteConfirm = () => {
  confirm({
    title: `Вы уверены, что хотите сделать ${record.client_surname} ${record.client_name} трененром?`,

 
    okText: 'Да',
    okType: 'danger',
    cancelText: 'Нет',
    onOk() {
      console.log('OK');
      console.log();
      createCoach(record)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

return (      

  <Button onClick={showDeleteConfirm} >
  
      Сделать тренером
  </Button>
)
};

export default MakeCoach;