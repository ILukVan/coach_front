import React, { useEffect, useState } from "react";
import { Table, DatePicker } from "antd";
// import ModalEdit from "./modalEdit ";
// import DeleteActivity from "./DeleteActivity";
import { instance } from "../../request";
import AddWorkOut from "./AddWorkOut";
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const WorkOutList = () => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
  }, []);

  const [workOutList, setWorkOutList] = useState();
  const fetchActivities = async () => {
    const data = await instance.get("/workout_list");
    console.log("------------------data-----------", data.data);

    setWorkOutList(data.data);
  };

  const createWorkOut = async (values) => {
    const data = await instance.post("/add_workout", values);

    setWorkOutList((prevData) => [...prevData, data.data]);
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
            {/* <ModalEdit record={record} />
            <DeleteActivity record={record} /> */}
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
