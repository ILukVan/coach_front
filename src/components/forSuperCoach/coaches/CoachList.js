import React, { useEffect, useState } from "react";
import {  Layout, theme } from "antd";
import { instance } from "../../../request";
import CoachListTable from "./CoachListTable";
import CoachListCard from "./CoachListCard";
import { useSelector } from "react-redux";
import SearchClient from "../clients/SearchClient";
const { Content } = Layout;

const CoachList = () => {
  const screen = useSelector((state) => state.rootReducer.screen.width);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [coachList, setCoachList] = useState([]);
// ------------------------------------------запрос всех тренеров ------------------------------
  const fetchCoach = async () => {
    const data = await instance.get("/coach_list");


    setCoachList(data.data);
  };
// ------------------------------------------запрос всех тренеров ------------------------------
// ------------------------------------------запрос удалить тренера ------------------------------
  const deleteCoach = async (id) => {

  const deleteCoach = await instance.delete("/delete_coach", {
    data: { id: id },

  });
  setCoachList(deleteCoach.data);
}
// ------------------------------------------запрос удалить тренера ------------------------------

  useEffect(() => {
    fetchCoach(); // функция которая делает запрос в сторе
  }, []);


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
          <SearchClient clientList={coachList} />
           {screen >=900 ?
          <CoachListTable coachList={coachList} deleteCoach={deleteCoach}/> :
          <CoachListCard coachList={coachList} deleteCoach={deleteCoach}/> }
        </div>
      </Content>
    </Layout>
  );
};
export default CoachList;
