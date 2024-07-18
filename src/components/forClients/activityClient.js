import React from "react";
import { Table, Progress } from "antd";
import SignUpTrain from "./SignUpTrain";
import UnSignUpTrain from "./UnSignUpTrain ";
import { useSelector } from "react-redux";

const onChange = (pagination, filters, sorter, extra) => {

};
const ActivityClient = ({ activity, workoutList, coachList, signUpTrain, unSignUpTrain}) => {

  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);



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
      render: (_, record) => {
        return (
          <>
            <Progress
              type="circle"
              size="small"
              percent={
                (record.recorded_client.length * 100) / record.occupancy_train
              }
              format={(percent) =>
                `${record.recorded_client.length} / ${record.occupancy_train}`
              }
            />
          </>
        );
      },
    },
    {
      title: "Edit Delet",
      dataIndex: "edit",
      render: (_, record) => {
        if ((role || "").includes("coach") ) {
          return <p>Ты тренер</p>;
        } 
        if (record.status_train === "тренировка завершена") {
          return <p>Запись завершена</p>;
        }

        if (
          record.recorded_client.length === record.occupancy_train &&
          record.recorded_client.includes(id)
        ) {
          return <UnSignUpTrain record={record} unSignUpTrain={unSignUpTrain}/>;
        }

        if (record.recorded_client.length === record.occupancy_train) {
          return <p>Мест нет</p>;
        }

        if (record.status_train !== "тренировка завершена") {
          return (
            <>
              {record.recorded_client.includes(id) ? (
                <UnSignUpTrain record={record} unSignUpTrain={unSignUpTrain}/>
              ) : (
                <SignUpTrain record={record} signUpTrain={signUpTrain}/>
              )}
            </>
          );
        }
      },
    },
  ];

  return (
    <div>

      <Table
        columns={columns}
        size="small"
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

export default ActivityClient;
