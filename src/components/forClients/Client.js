import React from "react";
import { Layout, theme } from "antd";

import ActivityClient from "./activityClient";

import { useState } from "react";


import { instance } from "../../request";
import dayjs from "dayjs";

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('tokens')}`;

const { Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
  const fetchActivities = async () => {
    const data = await instance.get("/activities");

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
       
          <ActivityClient
            activity={tableData}
            fetchActivities={fetchActivities}

            selectDateActivity={selectDateActivity}
            date={date}
          />

        </div>
      </Content>
    </Layout>
  );
};
export default App;
