import React from "react";
import { List, Divider } from "antd";
import { Link } from "react-router-dom";
import MakeCoach from "./makeCoach";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
require('dayjs/locale/ru')
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime)
dayjs.locale('ru') 


const ClientListCard = ({ clientList, createCoach }) => {
  const role = useSelector((state) => state.rootReducer.sign.user.role);
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
        dataSource={clientList}
        renderItem={(item, index) => (
          <List.Item>
            <div className="card">
              <Link to={`/id/${item.client_id}`}>{item.client_fio}</Link>
              <div className="card">
                <p>{item.client_phone_number}</p>
                <p>{dayjs(item.client_birthday).format("DD.MM.YYYY")} ({dayjs(item.client_birthday).fromNow(true)})</p>
                <div className="div1">
                  <Divider>
                    {role === "super_coach" && 
                    <MakeCoach record={item} createCoach={createCoach} />}
                  </Divider>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ClientListCard;
