import React, { useEffect } from "react";
import { Layout, theme, DatePicker, notification, Button } from "antd";
import ActivityCoach from "./activityCoach";
import ActivityCoachCard from "./activityCoachCard";
import { useState } from "react";
import { instance } from "../../request";
import dayjs from "dayjs";
import AddActivity from "./addActivity";
import { useSelector } from "react-redux";
const { Content } = Layout;

const Coach = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    selectDateActivity({ date: dayjs().format("YYYY-MM-DD") });
    getTypeWorkout();
    getCoachList();
  }, []);

  const screen = useSelector((state) => state.rootReducer.screen.width);

  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [workoutList, setWorkOutList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [recordedList, setRecordedList] = useState();
  const [coachList, setCoachList] = useState([]);
  const [counter, setCounter] = useState(0);


  // ---------------------------------------создать тренировку ----------------------------
  const createActivity = async (values) => {
    try{
      const data = await instance.post("/add_activity", values);
      setTableData(data.data)
    } catch (err){
     notification.error({
        message: "Ошибка!",
        description:  err.response.data,
      });
  };
}
  // ---------------------------------------создать тренировку ----------------------------
  // ---------------------------------------удалить тренировку ----------------------------
  const deleteActivity = async (values) => {

    const data = await instance.delete("/delete_activity", {
      data: { training_id: values, date: date.date },
    });
    setTableData(data.data);
  };
  // ---------------------------------------удалить тренировку ----------------------------
  // ---------------------------------------изменить тренировку ----------------------------
  const updateActivity = async (values) => {
    // try{
    values.date = date.date;
    const data = await instance.put("/update_activity", values);
    setTableData(data.data);
  //   } catch (err){
  //     notification.error({
  //        message: "Ошибка!",
  //        description:  err.response.data,
  //      });
  //  };
  };
  // ---------------------------------------изменить тренировку ----------------------------
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
  // ---------------------------------------запрос клиентов записанных и общий список ----------------------------
  const getClientList = async (value) => {
    const clients = await instance.post("/client_list_for_coach", value);
    setClientList(clients.data.difference);
    setRecordedList(clients.data.recorded);
  };
  // ---------------------------------------запрос клиентов записанных и общий список ----------------------------
  // ---------------------------------------удалить клиента с тренировки ----------------------------
  const deleteClient = async (value, id) => {
    const dataUnSign = {
      client_id: value,
      training_id: id,
    };
    const data = await instance.post("/unsign_up_train_coach", dataUnSign);
    setClientList(data.data.difference);
    setRecordedList(data.data.recorded);

  };

  // ---------------------------------------удалить клиента с тренировки ----------------------------
  // ---------------------------------------добавить клиента на тренировку ----------------------------
  const addClient = async (value, key, id) => {
    try {
    const dataSign = {
      client_id: key.key,
      training_id: id,
    };
    const data = await instance.post("/sign_up_train_coach", dataSign);
    setClientList(data.data.difference);
    setRecordedList(data.data.recorded);
  } catch {
    notification.error({
      message: "Ошибка!",
      description:  "Нет абонемента",
    });
    
  }

  };

  // ---------------------------------------добавить клиента на тренировку ----------------------------
  // --------------------------------------- выбор даты для последующего запроса тренировкок ---------------------
  const onChangeDate = (date, dateString) => {
    let selectDate = {
      date: dateString,
    };

    selectDateActivity(selectDate);
  };
  // --------------------------------------- выбор даты для последующего запроса тренировкок ---------------------
    // ---------------------------------------запрос трениров ----------------------------
    const getCoachList = async () => {
      const coach = await instance.get("/coaches_list");
  
      setCoachList(coach.data);
    };
    // ---------------------------------------запрос трениров ----------------------------
    // ---------------------------------------запрос шаблона тренировок----------------------------
    const getTemplateTrain = async () => {
    
      const templateTrain = await instance.post("/add_activity_template", {weekday_train: date.date});

      setTableData(templateTrain.data)
      
    }

    // ---------------------------------------запрос шаблона тренировок----------------------------
  const activityFlag = "activity"





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
</div>
          {screen >= 900 ?
          <ActivityCoach
            activity={tableData}
            deleteActivity={deleteActivity}
            updateActivity={updateActivity}
            selectDateActivity={selectDateActivity}
            createActivity={createActivity}
            workoutList={workoutList}
            date={date}
            getClientList={getClientList}
            clientList={clientList}
            recordedList={recordedList}
            deleteClient={deleteClient}
            addClient={addClient}
            coachList={coachList}
          /> :

          <ActivityCoachCard
            activity={tableData}
            deleteActivity={deleteActivity}
            updateActivity={updateActivity}
            selectDateActivity={selectDateActivity}
            createActivity={createActivity}
            workoutList={workoutList}
            date={date}
            getClientList={getClientList}
            clientList={clientList}
            recordedList={recordedList}
            deleteClient={deleteClient}
            addClient={addClient}
          /> }
{(
        dayjs().format("YYYY-MM-DD") <=
        dayjs(date.date).format("YYYY-MM-DD")
      ) && 
      <>
<AddActivity
        createActivity={createActivity}
        date={date}
        workoutList={workoutList}
        flag={activityFlag}
      />
      <Button onClick={getTemplateTrain}>Шаблон {dayjs(date.date).format("dddd")}</Button>
      </>
      }
        </div>
      </Content>
    </Layout>
  );
};
export default Coach;
