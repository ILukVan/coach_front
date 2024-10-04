import React from "react";
import { List, Progress, Divider } from "antd";
import "./activityCardCoach.css";
import RecordedList2 from "./RecordedList2";
import DeleteActivity from "./DeleteActivity";
import ModalEdit from "./modalEdit ";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import  giry2  from "../forClients/mdi--weights.svg"

const ActivityCoachCard = ({
  activity,
  deleteActivity,
  updateActivity,
  date,
  workoutList,
  getClientList,
  clientList,
  recordedList,
  deleteClient,
  addClient,
}) => {

  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  // -------------------------------- функция рендера редактора---------------------------
  function renderRecordedList(record) {

    if (record.client_id === id || role === "super_coach") {

       if ((dayjs().format("YYYY-MM-DD") <= dayjs(record.end_time_train).format("YYYY-MM-DD"))) {

      return (
        <div>  
          <div className="coach-options">
          <RecordedList2 
            record={record}
            clientList={clientList}
            recordedList={recordedList}
            getClientList={getClientList}
            deleteClient={deleteClient}
            addClient={addClient}
          />
          </div>
          <div className="coach-options">
          <ModalEdit 
            record={record}
            updateActivity={updateActivity}
            date={date}
            getClientList={getClientList}
            workoutList={workoutList}
            recordedList={recordedList}
          />
</div>
<div className="coach-options">
            <DeleteActivity 
            record={record}
            deleteActivity={deleteActivity}
            date={date}
          />
</div>

        </div> 

      );
    } else {
      return           <div className="coach-options">
      <RecordedList2 
        record={record}
        clientList={clientList}
        recordedList={recordedList}
        getClientList={getClientList}
        deleteClient={deleteClient}
        addClient={addClient}
      />
      </div>
    }
  }
    } 
  
  // -------------------------------- функция рендера редактора ----------------------------

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
              <p className="title-name">
                {item.start_time_train.slice(-5)}-
                {item.end_time_train.slice(-5)}
              </p>
              <div className="div1">
                <Divider type="vertical"></Divider>
                <div>{item.coach_train}</div>
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
              <div>{renderRecordedList(item)}</div>
              {item.updatedAt !== item.createdAt && <span> изменена {dayjs(item.updatedAt).format("DD.MM.YYYY HH:mm") } </span>} 
            </div>
            </div>
             
          </List.Item>
        )}
      />
    </div>
  );
};

export default ActivityCoachCard;
