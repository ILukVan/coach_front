import React from "react";
import { Layout, theme, DatePicker } from "antd";
import ActivityClient from "./activityClient";
import ActivityClientCard from "./activityClientCard";
import { useState,useEffect } from "react";
import { instance } from "../../request";
import dayjs from "dayjs";





const { Content } = Layout;

const Client = () => {

  const [windowWidth, setWindowWidth] = useState(window.screen.width);


useEffect(() => {
  selectDateActivity({date: dayjs().format("YYYY-MM-DD")})
  // fetchActivities()
  getTypeWorkout();
  getCoachList();
}, [])

  useEffect(() => {
    
      window.onresize = () => {setWindowWidth(window.screen.width)};
      // Ваш код
      return () => {window.onresize = false};

           
  }, [windowWidth]);
  


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState()
  const [workoutList, setWorkOutList] = useState([])
  const [coachList, setCoachList] = useState([])

//   // ---------------------------------------запрос тренировок----------------------------
//   const fetchActivities = async () => {
//     const data = await instance.get("/activities");
//     console.log(date, " -----------------вызываю дату в эффекте");
//     setTableData(data.data);
//   };
// // ---------------------------------------запрос тренировок ----------------------------

// ---------------------------------------запрос тренировок по дате ----------------------------
const selectDateActivity = async (values) => {
  setDate(values);

  const data = await instance.post("/date_activity", values);

  data.data !== null && setTableData(data.data);
};
// ---------------------------------------запрос тренировок по дате ----------------------------
// ---------------------------------------запрос типа тренировок ----------------------------
const getTypeWorkout = async() =>{
  const type = await instance.get("/workout_list")


  setWorkOutList(type.data)
} 
// ---------------------------------------запрос типа тренировок ----------------------------
// ---------------------------------------запрос трениров ----------------------------
const getCoachList = async() =>{
  const coach = await instance.get("/coaches_list")


  setCoachList(coach.data)
} 
// ---------------------------------------запрос трениров ----------------------------
const onChangeDate = (date, dateString) => {
  let selectDate = {
    date: dateString,
  };
  
  selectDateActivity(selectDate);
};


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
                <DatePicker
        onChange={onChangeDate}
        defaultValue={dayjs()}
        allowClear={false}
      />
          {windowWidth > 900 ?
          <ActivityClient
            activity={tableData}
            date={date}
            workoutList={workoutList}
            coachList={coachList}
          /> :

          <ActivityClientCard 
                    activity={tableData}
                    date={date}
                    workoutList={workoutList}
                    coachList={coachList}
                    
                  />
           }
           
        </div>
      </Content>
    </Layout>
  );
};
export default Client;
