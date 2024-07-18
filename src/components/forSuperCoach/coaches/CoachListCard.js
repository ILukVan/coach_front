import React from "react";
import { List, Divider } from "antd";
import { Link } from "react-router-dom";
import DeletePerson from "../DeletePerson";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime)


const CoachListCard = ({ coachList, deleteCoach }) => {
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
        dataSource={coachList}
        renderItem={(item, index) => (
          <List.Item>
            <div className="card">
              <Link to={`/id/${item.client_id}`}>{item.client_fio}</Link>
              <div className="card">
                <p>{item.client_phone_number}</p>
                <p>{item.client_birthday} ({dayjs(item.client_birthday).fromNow(true)})</p>
                <div className="div1">
                  <Divider>
                    <DeletePerson record={item} deletePerson={deleteCoach} />
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

export default CoachListCard;
