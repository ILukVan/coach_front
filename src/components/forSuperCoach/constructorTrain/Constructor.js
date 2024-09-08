import React, { useEffect, useState } from "react";
import { instance } from "../../../request.js";
import AddActivityConstructor from "./addActivityConstructor.js";
import AddWorkOut from "./AddWorkOut.js";
import WorkOutListTable from "./WorkOutListTable.js";
import WorkOutListCard from "./WorkOutListCard.js";
import { useSelector } from "react-redux";
import {  Layout, theme, Flex, Button, Select } from "antd";

const { Content } = Layout;

const Constructor = () => {
  const screen = useSelector((state) => state.rootReducer.screen.width);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useEffect(() => {
  //   fetchActivities(); // функция которая делает запрос в сторе
  // }, []);

  const [workOutList, setWorkOutList] = useState();
  const [tableData, setTableData] = useState([]);
  const [weekday, setWeekday] = useState("Понедельник");

  // ----------------------------запрос типа тренировок----------------------------------------
  const fetchActivities = async () => {
    const data = await instance.get("/workout_list");

    setWorkOutList(data.data);
  };
  // ----------------------------запрос типа тренировок----------------------------------------






    // ---------------------------------------создать тренировку ----------------------------
    const createActivity = async (values) => {

    }
  //     try{
  //       const data = await instance.post("/add_activity_constructor", values);
  //       setTableData(data.data)
  //     } catch (err){
  //      notification.error({
  //         message: "Ошибка!",
  //         description:  err.response.data,
  //       });
  //   };
  // }
    // ---------------------------------------создать тренировку ----------------------------
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setWeekday(value)
    };


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

      <Select
      defaultValue="Monday"

      onChange={handleChange}
      options={[
        {
          value: 'Monday',
          label: 'Понедельник',
        },
        {
          value: 'Tuesday',
          label: 'Вторник',
        },
        {
          value: 'Wednesday',
          label: 'Среда',
        },
        {
          value: 'Thursday',
          label: 'Четверг',
        },
        {
          value: 'Friday',
          label: 'Пятница',
        },
        {
          value: 'Saturday',
          label: 'Суббота',
        },
        {
          value: 'Sunday',
          label: 'Воскресенье',
        },
      ]}
    />
      {/* {screen >= 900 ?
      <WorkOutListTable
        workOutList={workOutList}
        updateWorkOut={updateWorkOut}
        deleteWorkOut={deleteWorkOut}
      /> :
      <WorkOutListCard 
              workOutList={workOutList}
              updateWorkOut={updateWorkOut}
              deleteWorkOut={deleteWorkOut}
            /> }*/}
      <AddActivityConstructor createActivity={createActivity} weekday={weekday}/>  
      </div>
      </Content>
    </Layout>
  );
};

export default Constructor;
