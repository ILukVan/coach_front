import React, { useEffect } from "react";
import { Layout, theme, DatePicker } from "antd";
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
  }, []);

  const screen = useSelector((state) => state.rootReducer.screen.width);

  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [workoutList, setWorkOutList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [recordedList, setRecordedList] = useState();


  // ---------------------------------------создать тренировку ----------------------------
  const createActivity = async (values) => {
    const data = await instance.post("/add_activity", values);

    setTableData((prevData) => [...prevData, data.data]);
  };
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
    values.date = date.date;

    const data = await instance.put("/update_activity", values);
    setTableData(data.data);
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
      client: value,
      training_id: id,
    };
    const data = await instance.post("/unsign_up_train_coach", dataUnSign);
    setClientList(data.data.difference);
    setRecordedList(data.data.recorded);
  };

  // ---------------------------------------удалить клиента с тренировки ----------------------------
  // ---------------------------------------добавить клиента на тренировку ----------------------------
  const addClient = async (value, id) => {
    const dataSign = {
      client: value,
      training_id: id,
    };
    const data = await instance.post("/sign_up_train_coach", dataSign);
    setClientList(data.data.difference);
    setRecordedList(data.data.recorded);
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

<AddActivity
        createActivity={createActivity}
        date={date}
        workoutList={workoutList}
      />
        </div>
      </Content>
    </Layout>
  );
};
export default Coach;
