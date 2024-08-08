import React from "react";
import { Table } from "antd";
import DeleteWorkOut from "./DeleteWorkOut.js";
import ModalEditWorkOut from "./modalEditWorkOut.js";

const onChange = (pagination, filters, sorter, extra) => {

};
const WorkOutListTable = ({workOutList, updateWorkOut, deleteWorkOut}) => {

  const columns = [
    {
      title: "Тип тренировки",
      dataIndex: "type_of_workout",
    },
    {
      title: "Описание тренировки",
      dataIndex: "description_of_workout",
    },
    {
      title: "Управление",
      dataIndex: "edit",
      render: (_, record) => {
        return (
          <>
            <ModalEditWorkOut record={record} updateWorkOut={updateWorkOut}/>
            <DeleteWorkOut record={record} deleteWorkOut={deleteWorkOut}/> 
          </>
        );
      },
    },
  ];

  return (
      <Table
        columns={columns}

        dataSource={workOutList}
        rowKey={(workOutList) => workOutList.workout_id}
        onChange={onChange}
      />

  );
};

export default WorkOutListTable;
