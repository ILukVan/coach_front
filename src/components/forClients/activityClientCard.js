import React, { useEffect } from "react";
import { List, DatePicker, Progress, Flex, Col, Row, Space, Card } from "antd";
import SignUpTrain from "./SignUpTrain";
import UnSignUpTrain from "./UnSignUpTrain ";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "./activityClientList.css";

const onChange = (pagination, filters, sorter, extra) => {};
const ActivityClientCard = ({
  activity,
  fetchActivities,
  selectDateActivity,
  getTypeWorkout,
  workoutList,
  getCoachList,
  coachList,
}) => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
    getTypeWorkout();
    getCoachList();
  }, []);
  const name = useSelector((state) => state.rootReducer.sign.user.name);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  // хук который забирает данные из стора
  const onChangeDate = (date, dateString) => {
    let selectDate = {
      date: dateString,
    };

    selectDateActivity(selectDate);
  };

  function verifyRole(record) {
    if ((role || "").includes("coach")) {
      return <p>Ты тренер</p>;
    }
    if (record.status_train === "тренировка завершена") {
      return <p>Запись завершена</p>;
    }

    if (
      record.recorded_client.length === record.occupancy_train &&
      record.recorded_client.includes(name)
    ) {
      return <UnSignUpTrain record={record} />;
    }

    if (record.recorded_client.length === record.occupancy_train) {
      return <p>Мест нет</p>;
    }

    if (record.status_train !== "тренировка завершена") {
      return (
        <>
          {record.recorded_client.includes(name) ? (
            <UnSignUpTrain record={record} />
          ) : (
            <SignUpTrain record={record} />
          )}
        </>
      );
    }
  }
  return (
    <div>
      <DatePicker
        onChange={onChangeDate}
        defaultValue={dayjs()}
        allowClear={false}
      />
      <List
     grid={{
      gutter: 2,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 6,
      xxl: 3,
    }}
        dataSource={activity}
        renderItem={(item, index) => (
          <List.Item>
            <Card className="card"
              title={<>{item.start_time_train.slice(
                -5
              )} - {item.end_time_train.slice(-5)} <br/>  {item.type_of_training} </>}
            >
              <div>{item.coach_train}</div>
              <div>
                <Progress
                  type="circle"
                  size="small"
                  percent={
                    (item.recorded_client.length * 100) / item.occupancy_train
                  }
                  format={(percent) =>
                    `${item.recorded_client.length} / ${item.occupancy_train}`
                  }
                />
              </div>

              <div>{verifyRole(item)}</div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ActivityClientCard;
