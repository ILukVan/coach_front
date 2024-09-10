import React from "react";
import { List, Divider } from "antd";
import "./ConstructorCard.css";
import ModalEditConstructor from "./modalEditConstructor.js";
import DeleteActivity from "../../forCoaches/DeleteActivity.js";
import { useSelector } from "react-redux";

const ConstructorListCard = ({
  activity,
  deleteConstructorActivity,
  updateConstructorActivity,
  workoutList,
}) => {
  const id = useSelector((state) => state.rootReducer.sign.user.id);
  const role = useSelector((state) => state.rootReducer.sign.user.role);

  // -------------------------------- функция рендера редактора---------------------------
  function renderRecordedList(record) {
    if (record.client_id === id || role === "super_coach") {
      return (
        <div>
          <div className="coach-options">
            <ModalEditConstructor
              record={record}
              updateConstructorActivity={updateConstructorActivity}
              workoutList={workoutList}

            />
          </div>
          <div className="coach-options">
            <DeleteActivity
              record={record}
              deleteActivity={deleteConstructorActivity}

            />
          </div>
        </div>
      );
    }
  }

  // -------------------------------- функция рендера редактора ----------------------------

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
              <div className="card">
                <p className="title-name">
                  {item.start_time_train.slice(-5)}-
                  {item.end_time_train.slice(-5)}
                </p>
                <div className="div1">
                  <Divider type="vertical"></Divider>
                  <div>Вместимость тренировки: {item.occupancy_train}</div>
                  <Divider type="vertical"></Divider>
                </div>
                <div>{renderRecordedList(item)}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ConstructorListCard;
