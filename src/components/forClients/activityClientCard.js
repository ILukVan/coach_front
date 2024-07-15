import React, { useEffect } from "react";
import { List, Progress, DatePicker, Card, Divider } from "antd";
import SignUpTrain from "./SignUpTrain";
import UnSignUpTrain from "./UnSignUpTrain ";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "./activityClientList.css";


const ActivityClientCard = ({
  activity,
}) => {

  const name = useSelector((state) => state.rootReducer.sign.user.name);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  // хук который забирает данные из стора

  function verifyRole(record) {
    if ((role || "").includes("coach")) {
      return <p>Ты тренер</p>;
    }
    if (record.status_train === "тренировка завершена") {
      return <span style={{padding:"0px"}}>Запись завершена</span>;
    }

    if (
      record.recorded_client.length === record.occupancy_train &&
      record.recorded_client.includes(name)
    ) {
      return <UnSignUpTrain record={record} />;
    }

    if (record.recorded_client.length === record.occupancy_train) {
      return <span style={{padding:"0px"}}>Мест нет</span>;
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
              <div className="card">
              <p className="title-name">{item.type_of_training}</p>
              <p className="title-name">{item.start_time_train.slice(-5)}-{item.end_time_train.slice(-5)}</p>
              <div className="div1">
                
                {/* <div className="time-train">
                  <p>{item.start_time_train.slice(-5)}
                    <br />
                  -
                  <br />
                  {item.end_time_train.slice(-5)}</p>
                </div> */}
                <Divider type="vertical"></Divider>
                <div>
                  {item.coach_train}
                  </div>
                  <Divider type="vertical"></Divider>
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
              </div>
              <p>{item.status_train}</p>
              <Divider>{verifyRole(item)}</Divider>
              </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ActivityClientCard;
