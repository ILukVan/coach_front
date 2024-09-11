import React from "react";
import { Table } from "antd";
import ModalEdit from "./modalEdit ";
import DeleteActivity from "./DeleteActivity";
import { useSelector } from "react-redux";
import RecordedList2 from "./RecordedList2";
import dayjs from "dayjs";

const onChange = (pagination, filters, sorter, extra) => {};
const ActivityCoach = ({
  activity,
  deleteActivity,
  updateActivity,
  date,
  workoutList,
  getClientList,
  clientList,
  recordedList,
  deleteClient,
  addClient,
  coachList,
}) => {
  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  // хук который забирает данные из стора

  function renderDeleteAndEdit(record) {

    if (record.client_id === id || role === "super_coach") {
      if (
        dayjs().format("YYYY-MM-DD") <=
        dayjs(record.end_time_train).format("YYYY-MM-DD")
      ) {
        return (
          <div>
            <div className="coach-options">
              <ModalEdit
                record={record}
                updateActivity={updateActivity}
                date={date}
                workoutList={workoutList}
                recordedList={recordedList}
                getClientList={getClientList}
              />
            </div>
            <div className="coach-options">
              <DeleteActivity
                record={record}
                deleteActivity={deleteActivity}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="coach-options">Внесение изменений завершено </div>
        );
      }
    }
  }

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
      filters: workoutList.map((item) => ({
        text: item.type_of_workout,
        value: item.type_of_workout,
      })),


      onFilter: (value, record) => record.type_of_training.startsWith(value),

    },
    {
      title: "Тренер",
      dataIndex: "coach_train",
      filters: coachList.map(item => ({
        text: item.client_fio,
        value: item.client_fio,
      })), 
      onFilter: (value, record) => record.coach_train.startsWith(value),
    },
    {
      title: "Количество мест",
      dataIndex: "occupancy_train",

      render: (_, record) => {
        if (record.client_id === id || role === "super_coach") {

          return (
            <div className="recorded-for-coach">
            <p>Записавшиеся: {record.recorded_client.length}/{record.occupancy_train}</p>
              <RecordedList2
                record={record}
                clientList={clientList}
                recordedList={recordedList}
                getClientList={getClientList}
                deleteClient={deleteClient}
                addClient={addClient}
              />
            </div>
          );
        } else {
          return <p>нет доступа</p>;
        }
      },
    },

    {
      title: "Управление тренировками",
      dataIndex: "edit",
      render: (_, record) => {
        return renderDeleteAndEdit(record);
      },
    },
  ];

  return (
    <div>
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
    </div>
  );
};

export default ActivityCoach;
