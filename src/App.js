

import React from 'react';
import { Layout, theme } from 'antd';
import "./App.css";
import Activity from "./components/activity";
import AddActivity from "./components/addActivity";
import { useState } from "react";
import axios from "axios";


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


  const fetchActivities = async () => {
    const data = await axios.get("http://localhost:3500/activities");
    
    setTableData(data.data);
  };

  const createActivity = async (values) => {

    const data = await axios.post("http://localhost:3500/add_activity", values);

    setTableData((prevData) => [...prevData, data.data]);
  };

  const deleteActivity = async (values) => {
    console.log(values);
  
    const data = await axios.delete("http://localhost:3500/delete_activity", {
      data: { training_id: values }});
     setTableData(data.data);
  };

  const updateActivity = async (values) => {
  
    const data = await axios.put("http://localhost:3500/update_activity", values );
     setTableData(data.data);
  };

  const selectDateActivity = async (values) => {

    const data = await axios.post("http://localhost:3500/date_activity", values);

    setTableData(data.data);
  };

  return (
    <Layout>
    
      <Content
        style={{
          padding: '0 48px',
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
                <Activity activity={tableData} fetchActivities={fetchActivities} deleteActivity={deleteActivity} updateActivity={updateActivity} selectDateActivity={selectDateActivity}/>
                <AddActivity sendActyv={myFun} createActivity={createActivity} />

        </div>
      </Content>

    </Layout>
  );
};
export default App;