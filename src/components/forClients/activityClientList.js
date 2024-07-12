import React, { useEffect } from "react";
import { List, DatePicker, Progress, Flex, Col, Row, Space } from "antd";
import SignUpTrain from "./SignUpTrain";
import UnSignUpTrain from "./UnSignUpTrain ";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "./activityClientList.css";

const onChange = (pagination, filters, sorter, extra) => {};
const ActivityClientList = ({
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

  return (
    <div>
      <DatePicker
        onChange={onChangeDate}
        defaultValue={dayjs()}
        allowClear={false}
      />
      <List
        itemLayout="horizontal"
        dataSource={activity}
        renderItem={(item, index) => (
          <List.Item>

            <div>
                {item.start_time_train.slice(-5)} -{" "}
                {item.end_time_train.slice(-5)}
</div>

<div>
{item.type_of_training}
</div>
<div>
               {item.coach_train}
               </div>
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

<div>
           {(role || "").includes("coach") && <p>Ты тренер</p>}
                {item.status_train === "тренировка завершена" && (
                  <p>Запись завершена</p>
                )}
                {item.recorded_client.length === item.occupancy_train &&
                  item.recorded_client.includes(name) && (
                    <UnSignUpTrain record={item} />
                  )}
                {item.recorded_client.length === item.occupancy_train && (
                  <p>Мест нет</p>
                )}
                {item.status_train !== "тренировка завершена" && (
                  <>
                    {item.recorded_client.includes(name) ? (
                      <UnSignUpTrain record={item} />
                    ) : (
                      <SignUpTrain record={item} />
                    )}
                  </>
                )}
                </div>

          </List.Item> 
        )}
      />
    </div>
  );
};

export default ActivityClientList;
