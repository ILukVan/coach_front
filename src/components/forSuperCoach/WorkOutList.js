import React, { useEffect, useState } from "react";
import { Table } from "antd";
import DeleteWorkOut from "./DeleteWorkOut.js";
import ModalEditWorkOut from "./modalEditWorkOut.js";
import { instance } from "../../request";
import AddWorkOut from "./AddWorkOut";
const onChange = (pagination, filters, sorter, extra) => {

};
const WorkOutList = () => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
    console.log("рендер страницы управления")
  }, []);

  const [workOutList, setWorkOutList] = useState();
  const fetchActivities = async () => {
    const data = await instance.get("/workout_list");

    setWorkOutList(data.data);
  };

  const createWorkOut = async (values) => {
    const data = await instance.post("/add_workout", values);

    setWorkOutList((prevData) => [...prevData, data.data]);
  };

  const deleteWorkOut = async (values) => {
    const data = await instance.delete("/delete_workout_activity", {
      data: { training_id: values},
    });
    setWorkOutList(data.data);
  };

  const updateWorkOut = async (values) => {

    const data = await instance.put("/update_workout", values);
    setWorkOutList(data.data);
  };

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
      title: "Edit Delet",
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
    <div>
      <Table
        columns={columns}

        dataSource={workOutList}
        rowKey={(workOutList) => workOutList.workout_id}
        onChange={onChange}
      />
    <AddWorkOut createWorkOut={createWorkOut}/>
    </div>
  );
};

export default WorkOutList;
