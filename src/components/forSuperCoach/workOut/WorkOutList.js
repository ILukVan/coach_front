import React, { useEffect, useState } from "react";
import { instance } from "../../../request.js";
import AddWorkOut from "./AddWorkOut";
import WorkOutListTable from "./WorkOutListTable.js";
import WorkOutListCard from "./WorkOutListCard.js";
import { useSelector } from "react-redux";
import {  Layout, theme } from "antd";

const { Content } = Layout;

const WorkOutList = () => {
  const screen = useSelector((state) => state.rootReducer.screen.width);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
  }, []);

  const [workOutList, setWorkOutList] = useState();

  // ----------------------------запрос типа тренировок----------------------------------------
  const fetchActivities = async () => {
    const data = await instance.get("/workout_list");

    setWorkOutList(data.data);
  };
  // ----------------------------запрос типа тренировок----------------------------------------
  // ---------------------------- создать тип тренировки----------------------------------------
  const createWorkOut = async (values) => {
    const data = await instance.post("/add_workout", values);

    setWorkOutList((prevData) => [...prevData, data.data]);
  };
  // ---------------------------- создать тип тренировки----------------------------------------
  // ---------------------------- удалить тип тренировки----------------------------------------
  const deleteWorkOut = async (values) => {
    const data = await instance.delete("/delete_workout_activity", {
      data: { training_id: values },
    });
    setWorkOutList(data.data);
  };
  // ---------------------------- удалить тип тренировки----------------------------------------
  // ---------------------------- редактировать тип тренировки----------------------------------------
  const updateWorkOut = async (values) => {
    const data = await instance.put("/update_workout", values);
    setWorkOutList(data.data);
  };
  // ---------------------------- редактировать тип тренировки----------------------------------------

  return (
    <Layout>
    <Content
      style={{
        padding: "0 48px",
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      > 
      {screen >= 900 ?
      <WorkOutListTable
        workOutList={workOutList}
        updateWorkOut={updateWorkOut}
        deleteWorkOut={deleteWorkOut}
      /> :
      <WorkOutListCard 
              workOutList={workOutList}
              updateWorkOut={updateWorkOut}
              deleteWorkOut={deleteWorkOut}
            /> }
      <AddWorkOut createWorkOut={createWorkOut} /> 
      </div>
      </Content>
    </Layout>
  );
};

export default WorkOutList;
