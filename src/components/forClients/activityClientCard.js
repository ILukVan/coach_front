import React from "react";
import { List, Progress, Divider, Rate } from "antd";
import SignUpTrain from "./SignUpTrain";
import UnSignUpTrain from "./UnSignUpTrain ";
import { useSelector } from "react-redux";
import "./activityClientList.css";
import dayjs from "dayjs";
import  giry2  from "./mdi--weights.svg"

const ActivityClientCard = ({
  activity,
  signUpTrain,
  unSignUpTrain
}) => {

  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  // хук который забирает данные из стора

  const clientStartTime = []
const clientEndTime = []

  activity.forEach(train => {
    if (train.recorded_client.includes(id)){
  
      clientStartTime.push(train.start_time_train)
      clientEndTime.push(train.end_time_train)
    }
    
  });


  function verifyRole(record) {
    if ((role || "").includes("coach")) {
      return <p>Ты тренер</p>;
    }
    if (record.status_train === "тренировка завершена") {
      return <span style={{padding:"0px"}}>Запись завершена</span>;
    }
    if (dayjs(record.start_time_train)<dayjs().add(90, "m") & record.recorded_client.includes(id)){
      return <span>Запись отменить нельзя</span>;
    }
    if (
          
      record.recorded_client.includes(id)
    ) {
      return <UnSignUpTrain record={record} unSignUpTrain={unSignUpTrain}/>;
    }
    if (
      record.recorded_client.length === record.occupancy_train &&
      record.recorded_client.includes(id)
    ) {
      return <UnSignUpTrain record={record} unSignUpTrain={unSignUpTrain}/>;
    }

    if (record.recorded_client.length === record.occupancy_train) {
      return <span style={{padding:"0px"}}>Мест нет</span>;
    }
    for (let i=0; i!==clientStartTime.length; i++){

      if (clientStartTime[i] <= record.start_time_train && record.start_time_train < clientEndTime[i]){
      return <p>В это время Вы на занятии</p>;
    }
      if (clientStartTime[i].slice(0, 13) === record.start_time_train.slice(0,13) && clientStartTime[i]>record.start_time_train){
        return <p>В это время Вы на занятии</p>;
      }
      if (clientStartTime[i]<record.end_time_train && clientStartTime[i]>record.start_time_train){
        return <p>В это время Вы на занятии</p>;
      }

    }

    if (record.status_train !== "тренировка завершена") {
      return (
        <>
          {record.recorded_client.includes(id) ? (
            <UnSignUpTrain record={record} unSignUpTrain={unSignUpTrain}/>
          ) : (
            <SignUpTrain record={record}  signUpTrain={signUpTrain}/>
          )}
        </>
      );
    }
  }

  function weight (value, type) {
    if (value === "5/6"){
      return (
        <>
        <p className="title-name" style={{backgroundColor:"green", borderRadius:"inherit"}}>{type} </p>
        </>
      )
    }

    if (value === "7/8"){
      return (
        <>
        <p className="title-name" style={{backgroundColor:"yellow", borderRadius:"inherit"}}>{type}  <img src={giry2}/></p>
        </>
      )
    }

    if (value === "9"){
      return (
        <>
        <p className="title-name" style={{backgroundColor:"orange", borderRadius:"inherit"}}>{type}  <img src={giry2}/> <img src={giry2}/> </p>
        </>
      )
    }
    if (value === "10"){
      return (
        <>
        <p className="title-name" style={{backgroundColor:"red", borderRadius:"inherit"}}>{type}  <img src={giry2}/> <img src={giry2}/> <img src={giry2}/> </p>
        </>
      )
    } else {
      return (
        <>
        <p className="title-name" >{type}</p>
        </>
      )
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
              {weight(item.complexity_of_training, item.type_of_training)}
              <div className="card">
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
              </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ActivityClientCard;


// <span> <CheckCircleFilled /> </span>
//  <img src={kettlebell}/>