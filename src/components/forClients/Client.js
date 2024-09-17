import React from "react";
import { Layout, theme, DatePicker, notification } from "antd";
import ActivityClient from "./activityClient";
import ActivityClientCard from "./activityClientCard";
import { useState, useEffect } from "react";
import { instance } from "../../request";
import dayjs from "dayjs";
import { useSelector } from "react-redux";



const { Content } = Layout;

const Client = () => {
  const screen = useSelector((state) => state.rootReducer.screen.width);
  const id = useSelector((state) => state.rootReducer.sign.user.id);

  useEffect(() => {
    selectDateActivity({ date: dayjs().format("YYYY-MM-DD") });

    getTypeWorkout();
    getCoachList();
  }, []);


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState();
  const [workoutList, setWorkOutList] = useState([]);
  const [coachList, setCoachList] = useState([]);

  
  // ---------------------------------------запрос тренировок по дате ----------------------------
  const selectDateActivity = async (values) => {
    setDate(values);

    const data = await instance.post("/date_activity", values);

    data.data !== null && setTableData(data.data);
    
  };
  // ---------------------------------------запрос тренировок по дате ----------------------------
  // ---------------------------------------запрос типа тренировок ----------------------------
  const getTypeWorkout = async () => {
    const type = await instance.get("/workout_list");

    setWorkOutList(type.data);
  };
  // ---------------------------------------запрос типа тренировок ----------------------------
  // ---------------------------------------запрос трениров ----------------------------
  const getCoachList = async () => {
    const coach = await instance.get("/coaches_list");

    setCoachList(coach.data);
  };
  // ---------------------------------------запрос трениров ----------------------------
  // --------------------------------------- выбор даты для последующего запроса тренировкок ---------------------
  const onChangeDate = (date, dateString) => {

    let selectDate = {
      date: dateString,
    };

    selectDateActivity(selectDate);
  };
  // --------------------------------------- выбор даты для последующего запроса тренировкок ---------------------
  //------------------------- клиент записывается на тренировку -----------------------------------
  const signUpTrain = async (values) => {
    // await instance.post("/sign_up_train", values);

    // selectDateActivity(date)

        try {
        const pass = await instance.post("/sign_up_train", values);

          
        selectDateActivity(date)
      
      notification.success({
        message: `${pass.data.pass_status}!`,
        description: Number.isInteger(pass.data.client_pass) ? `Остаток занятий по абонементу: ${pass.data.client_pass}` : pass.data.client_pass,
      });
  
      
    } catch (err){

      notification.error({
        message: "Ошибка!",
        description: err.response.data,
      });
    }
  };
  //------------------------- клиент записывается на тренировку -----------------------------------
  //------------------------- клиент отписывается от тренировки -----------------------------------
  const unSignUpTrain = async (values) => {
     const unsign = {
      client_id: id, 
      training_id: values.training_id
     }

   await instance.post("/unsign_up_train", unsign);

   selectDateActivity(date)
  };

  //-------------------------  клиент отписывается от тренировки -----------------------------------

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
          <div className="date-picker">
          <DatePicker
            onChange={onChangeDate}
            defaultValue={dayjs()}
            allowClear={false}
          />
  <span className="weekDay-datePicker">{dayjs(date?.date).format("dddd")}</span>
</div>
          {screen >= 900 ? (
            <ActivityClient
              activity={tableData}
              date={date}
              workoutList={workoutList}
              coachList={coachList}
              signUpTrain={signUpTrain}
              unSignUpTrain={unSignUpTrain}
            />
          ) : (
            <ActivityClientCard
              activity={tableData}
              signUpTrain={signUpTrain}
              unSignUpTrain={unSignUpTrain}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};
export default Client;
