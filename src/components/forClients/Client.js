import React from "react";
import { Layout, theme } from "antd";

import ActivityClient from "./activityClient";

import { useState,useEffect } from "react";


import { instance } from "../../request";
import dayjs from "dayjs";
import ActivityClientList from "./activityClientList";
import ActivityClientCard from "./activityClientCard";


// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('tokens')}`;

const { Content } = Layout;

const Client = () => {

  const [windowWidth, setWindowWidth] = useState(window.screen.width);

  useEffect(() => {
      window.onresize = () => {setWindowWidth(window.screen.width)};
      // Ваш код
      return () => {window.onresize = false};
  }, [windowWidth]);
  


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [workoutList, setWorkOutList] = useState([])
  const [coachList, setCoachList] = useState([])
  const fetchActivities = async () => {
    const data = await instance.get("/activities");

    setTableData(data.data);
  };


  const selectDateActivity = async (values) => {

    setDate(values)

    const data = await instance.post(
      "/date_activity",
      values
    );

    data.data !== null && setTableData(data.data);
  };
// ---------------------------------------запрос типа тренировок ----------------------------
const getTypeWorkout = async() =>{
  const type = await instance.get("/workout_list")


  setWorkOutList(type.data)
} 
// ---------------------------------------запрос типа тренировок ----------------------------
// ---------------------------------------запрос типа тренировок ----------------------------
const getCoachList = async() =>{
  const coach = await instance.get("/coaches_list")


  setCoachList(coach.data)
} 
// ---------------------------------------запрос типа тренировок ----------------------------
console.log("размер экрана", windowWidth) ;
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

          <ActivityClient
            activity={tableData}
            fetchActivities={fetchActivities}
            getTypeWorkout={getTypeWorkout}
            selectDateActivity={selectDateActivity}
            date={date}
            workoutList={workoutList}
            getCoachList={getCoachList}
            coachList={coachList}
            
          /> :
           {/*
          <ActivityClientList 
            activity={tableData}
            fetchActivities={fetchActivities}
            getTypeWorkout={getTypeWorkout}
            selectDateActivity={selectDateActivity}
            date={date}
            workoutList={workoutList}
            getCoachList={getCoachList}
            coachList={coachList}
            
          /> */}
          <ActivityClientCard 
                    activity={tableData}
                    fetchActivities={fetchActivities}
                    getTypeWorkout={getTypeWorkout}
                    selectDateActivity={selectDateActivity}
                    date={date}
                    workoutList={workoutList}
                    getCoachList={getCoachList}
                    coachList={coachList}
                    
                  />
           
        </div>
      </Content>
    </Layout>
  );
};
export default Client;
