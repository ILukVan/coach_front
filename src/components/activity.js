import React, { useEffect } from "react";
import { Table, DatePicker } from "antd";
import ModalEdit from "./modalEdit ";
import DeleteActivity from "./DeleteActivity";
import dayjs from 'dayjs';


const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Activity = ({ activity, fetchActivities, deleteActivity, updateActivity, selectDateActivity, date}) => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
  }, []);

  // хук который забирает данные из стора
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    let selectDate ={
      date: dateString
    } 
  
    selectDateActivity(selectDate)
  };


  const columns = [
    {
      title: "Время занятия",
      dataIndex: "start_time_train",
      sorter: {
        compare: (a, b) => a.start_time_train.localeCompare(b.start_time_train),
        multiple: 1,
      },
      render: (_, record) => (
        <span>{`${record.start_time_train.slice(
          -5
        )} - ${record.end_time_train.slice(-5)} `}</span>
      ),
    },
    Table.EXPAND_COLUMN,
    {
      title: "Тип занятия",
      dataIndex: "type_of_training",
      filters: [
        {
          text: "Растяжка",
          value: "Растяжка",
        },
        {
          text: "Йога",
          value: "Йога",
        },
        {
          text: "Барре",
          value: "Барре",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.type_of_training.startsWith(value),
      width: "30%",
    },

    {
      title: "Статус тренировки",
      dataIndex: "status_train",
      sorter: {
        compare: (a, b) => a.status_train.localeCompare(b.status_train),
        multiple: 3,
      },
    },
    {
      title: "Количество мест",
      dataIndex: "occupancy_train",
      sorter: {
        compare: (a, b) => a.occupancy_train - b.occupancy_train,
        multiple: 4,
      },
    },
    {
      title: "Edit Delet",
      dataIndex: "edit",
      render: (_, record) => {
if (record.client_id === JSON.parse(localStorage.getItem("tokens")).user) {
  return (
          <>

            <ModalEdit record={record} updateActivity={updateActivity} date={date}/>
            <DeleteActivity record={record} deleteActivity={deleteActivity} date={date}/>

          </>
        );

} else { return(
<p>нет доступа</p>)}

        
      },
    },
  ];

  return (
    <div>
      <DatePicker onChange={onChangeDate} defaultValue={dayjs()} allowClear={false}/>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
        }}
        dataSource={activity}
        rowKey={(activity) => activity.training_id}
        onChange={onChange}
      />

    </div>
  );
};

export default Activity;
