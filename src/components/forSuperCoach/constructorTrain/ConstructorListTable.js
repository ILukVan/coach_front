import React from "react";
import { Table } from "antd";
import ModalEditConstructor from "./modalEditConstructor.js";
import DeleteActivity from "../../forCoaches/DeleteActivity.js";

const onChange = (pagination, filters, sorter, extra) => {};
const ConstructorListTable = ({
  constructorList,
  updateWorkOut,
  workoutList,
  updateConstructorActivity,
  deleteConstructorActivity,
}) => {
  const columns = [
    {
      title: "Время занятия",
      dataIndex: "start_time_train",
      render: (_, record) => (
        <span>{`${record.start_time_train.slice(
          -5
        )} - ${record.end_time_train.slice(-5)} `}</span>
      ),
    },
    {
      title: "Тип тренировки",
      dataIndex: "type_of_training",
    },
    {
      title: "Вместимость тренировки",
      dataIndex: "occupancy_train",
    },
    {
      title: "Управление",
      dataIndex: "edit",
      render: (_, record) => {
        return (
          <>
            <ModalEditConstructor
              record={record}
              updateWorkOut={updateWorkOut}
              workoutList={workoutList}
              updateConstructorActivity={updateConstructorActivity}
            />
            <DeleteActivity
              record={record}
              deleteActivity={deleteConstructorActivity}
            />
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={constructorList}
      rowKey={(constructorList) => constructorList.training_id}
      onChange={onChange}
    />
  );
};

export default ConstructorListTable;
