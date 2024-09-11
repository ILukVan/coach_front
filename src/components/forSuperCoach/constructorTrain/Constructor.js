import React, { useEffect, useState } from "react";
import { instance } from "../../../request.js";
import { useSelector } from "react-redux";
import { Layout, theme, Select, notification } from "antd";
import AddActivity from "../../forCoaches/addActivity.js";
import ConstructorListTable from "./ConstructorListTable.js";
import ConstructorListCard from "./ConstructorListCard.js";

const { Content } = Layout;

const Constructor = () => {
  const screen = useSelector((state) => state.rootReducer.screen.width);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchWorkOutList(); // функция которая делает запрос в сторе
    fetchWeekDayActivity(weekday);
  }, []);

  const [workOutList, setWorkOutList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [weekday, setWeekday] = useState("понедельник");

  // ----------------------------запрос типа тренировок----------------------------------------
  const fetchWorkOutList = async () => {
    const data = await instance.get("/workout_list");
    setWorkOutList(data.data);
  };
  // ----------------------------запрос типа тренировок----------------------------------------
  // ----------------------------запрос тренироков по дню недели -----------------------------
  const fetchWeekDayActivity = async (weekdayFetch) => {
    const data = await instance.post("/activity_constructor", {
      weekday_train: weekdayFetch,
    });
    setTableData(data.data);
  };

  // ----------------------------запрос тренироков по дню недели -----------------------------
  const constructorFlag = "constructor";

  console.log(tableData);

  // ---------------------------------------создать тренировку ----------------------------
  const createActivityConstructor = async (values) => {
    try {
      const data = await instance.post("/add_activity_constructor", values);
      console.log(data);
      
      setTableData(data.data);
    } catch (err) {
      notification.error({
        message: "Ошибка!",
        description: err.response.data,
      });
    }
  };

  // ---------------------------------------создать тренировку ----------------------------
  const handleChange = (value) => {
    fetchWeekDayActivity(value);
    setWeekday(value);
  };

  // ---------------------------------------изменить тренировку ----------------------------
  const updateConstructorActivity = async (values) => {
    try {
      const data = await instance.put("/edit_activity_constructor", values);
      setTableData(data.data);
    } catch (err) {
      notification.error({
        message: "Ошибка!",
        description: err.response.data,
      });
    }
  };
  // ---------------------------------------изменить тренировку ----------------------------
  // ---------------------------------------удалить тренировку ----------------------------
  const deleteConstructorActivity = async (values) => {
    const data = await instance.delete("/delete_activity_constructor", {
      data: { training_id: values, weekday_train: weekday },
    });
    setTableData(data.data);
  };
  // ---------------------------------------удалить тренировку ----------------------------

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
          <Select
            defaultValue="Понедельник"
            onChange={handleChange}
            options={[
              {
                value: "понедельник",
                label: "Понедельник",
              },
              {
                value: "вторник",
                label: "Вторник",
              },
              {
                value: "среда",
                label: "Среда",
              },
              {
                value: "четверг",
                label: "Четверг",
              },
              {
                value: "пятница",
                label: "Пятница",
              },
              {
                value: "суббота",
                label: "Суббота",
              },
              {
                value: "воскресенье",
                label: "Воскресенье",
              },
            ]}
          />
          {screen >= 900 ?
          <ConstructorListTable
            constructorList={tableData}
            workoutList={workOutList}
            updateConstructorActivity={updateConstructorActivity}
            deleteConstructorActivity={deleteConstructorActivity}
          /> :
      <ConstructorListCard 
            activity={tableData}
            workoutList={workOutList}
            updateConstructorActivity={updateConstructorActivity}
            deleteConstructorActivity={deleteConstructorActivity}
            /> }
          {/* <ConstructorListTable
            constructorList={tableData}
            workoutList={workOutList}
            updateConstructorActivity={updateConstructorActivity}
            deleteConstructorActivity={deleteConstructorActivity}
          /> */}
          <AddActivity
            createActivity={createActivityConstructor}
            workoutList={workOutList}
            flag={constructorFlag}
            weekday={weekday}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Constructor;
