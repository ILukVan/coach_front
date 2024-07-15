import React, { useEffect } from "react";
import { Table, DatePicker } from "antd";
import ModalEdit from "./modalEdit ";
import DeleteActivity from "./DeleteActivity";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import AddActivity from "./addActivity";
import RecordedList2 from "./RecordedList2";

const onChange = (pagination, filters, sorter, extra) => {};
const ActivityCoach = ({
  activity,
  fetchActivities,
  deleteActivity,
  updateActivity,
  selectDateActivity,
  date,
  createActivity,
  workoutList,
  getTypeWorkout,
  getClientList,
  clientList,
  recordedList,
  deleteClient,
  addClient,
}) => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
    getTypeWorkout();
    console.log("рендер страницы редактирования тренировок");
  }, []);

  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  // хук который забирает данные из стора
  const onChangeDate = (date, dateString) => {
    let selectDate = {
      date: dateString,
    };

    selectDateActivity(selectDate);
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
      filters: workoutList.map(item => ({
        text: item.type_of_workout,
        value: item.type_of_workout,
      })), 

      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.type_of_training.startsWith(value),
      width: "30%",
    },
    {
      title: "Количество мест",
      dataIndex: "occupancy_train",

      render: (_, record) => {
        if (record.client_id === id || role === "super_coach") {
          return (
            <>
              <RecordedList2
                record={record}
                clientList={clientList}
                recordedList={recordedList}
                getClientList={getClientList}
                deleteClient={deleteClient}
                addClient={addClient}
              />
            </>
          );
        } else {
          return <p>нет доступа</p>;
        }
      },
    },

    {
      title: "Edit Delet",
      dataIndex: "edit",
      render: (_, record) => {
        if (record.client_id === id || role === "super_coach") {
          return (
            <>
              <ModalEdit
                record={record}
                updateActivity={updateActivity}
                date={date}
                workoutList={workoutList}
              />
              <DeleteActivity
                record={record}
                deleteActivity={deleteActivity}
                date={date}
              />
            </>
          );
        } else {
          return <p>нет доступа</p>;
        }
      },

    },
  ];

  return (
    <div>
      <DatePicker
        onChange={onChangeDate}
        defaultValue={dayjs()}
        allowClear={false}
      />
      <Table
        columns={columns}
      virtual
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description_of_train}
            </p>
          ),
        }}
        dataSource={activity}
        rowKey={(activity) => activity.training_id}
        onChange={onChange}
      />
      <AddActivity
        createActivity={createActivity}
        date={date}
        workoutList={workoutList}
      />
    </div>
  );
};

export default ActivityCoach;
