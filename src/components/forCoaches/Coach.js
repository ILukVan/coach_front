import React from "react";
import { Layout, theme } from "antd";
import ActivityCoach from "./activityCoach";
// import AddActivity from "./addActivity";
import { useState } from "react";
import { instance } from "../../request";
import dayjs from "dayjs";


const { Content } = Layout;

const Coach = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [workoutList, setWorkOutList] = useState([])
  const [clientList, setClientList] = useState([]);
  const [recordedList, setRecordedList] = useState();

// ---------------------------------------запрос тренировок ----------------------------
  const fetchActivities = async () => {
    const data = await instance.get("/activities");

    setTableData(data.data);
  };
// ---------------------------------------запрос тренировок ----------------------------
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
const getTypeWorkout = async() =>{
  const type = await instance.get("/workout_list")

  setWorkOutList(type.data)
} 
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
  }
  const data = await instance.post("/unsign_up_train_coach", dataUnSign);
  setClientList(data.data.difference);
  setRecordedList(data.data.recorded);
} 

// ---------------------------------------удалить клиента с тренировки ----------------------------
// ---------------------------------------добавить клиента на тренировку ----------------------------
const addClient = async (value, id) => {
  const dataSign = {
    client: value,
    training_id: id,
  }
  const data = await instance.post("/sign_up_train_coach", dataSign);
  setClientList(data.data.difference);
  setRecordedList(data.data.recorded);

};

// ---------------------------------------добавить клиента на тренировку ----------------------------

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
          <ActivityCoach
            activity={tableData}
            fetchActivities={fetchActivities}
            deleteActivity={deleteActivity}
            updateActivity={updateActivity}
            selectDateActivity={selectDateActivity}
            createActivity={createActivity}
            workoutList={workoutList}
            date={date}
            getTypeWorkout={getTypeWorkout}
            getClientList={getClientList}
            clientList={clientList}
            recordedList={recordedList}
            deleteClient={deleteClient}
            addClient={addClient}
          />
        </div>
      </Content>
    </Layout>
  );
};
export default Coach;
