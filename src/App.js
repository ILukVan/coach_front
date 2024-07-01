import React from "react";
import { Layout, theme, notification } from "antd";
import "./App.css";
import Activity from "./components/activity";
import AddActivity from "./components/addActivity";
import { useState } from "react";
import axios from "axios";

import { instance } from "./request";
import dayjs from "dayjs";

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('tokens')}`;

const { Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [activity, setActivity] = useState([]);

  const myFun = (activity) => {
    setActivity(activity);
  };
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
  const fetchActivities = async () => {
    const data = await instance.get("/activities");

    setTableData(data.data);
  };

  const createActivity = async (values) => {
    const data = await instance.post("/add_activity", values);

    setTableData((prevData) => [...prevData, data.data]);
  };

  const deleteActivity = async (values) => {


    const data = await instance.delete("/delete_activity", {
      data: { training_id: values, date: date.date },
    });
    setTableData(data.data);
  };

  const updateActivity = async (values) => {
    console.log(values);
    console.log(date);
    values.date = date.date
    console.log(values);
    const data = await instance.put(
      "/update_activity",
      values
    );
    setTableData(data.data);
  };

  const selectDateActivity = async (values) => {
    console.log(values);
    setDate(values)

    const data = await instance.post(
      "/date_activity",
      values
    );
    console.log(data.data);
    data.data !== null && setTableData(data.data);
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
          <Activity
            activity={tableData}
            fetchActivities={fetchActivities}
            deleteActivity={deleteActivity}
            updateActivity={updateActivity}
            selectDateActivity={selectDateActivity}
            date={date}
          />
          <AddActivity sendActyv={myFun} createActivity={createActivity} date={date}/>
        </div>
      </Content>
    </Layout>
  );
};
export default App;
