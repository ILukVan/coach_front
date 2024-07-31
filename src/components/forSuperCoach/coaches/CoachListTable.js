import React from "react";
import { Table } from "antd";
import { Link } from 'react-router-dom';
import DeletePerson from "../DeletePerson";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const CoachListTable = ({coachList, deleteCoach}) => {
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  const onChange = (pagination, filters, sorter, extra) => {

  };


  const columns = [
    {
      title: "Имя клиента",
      dataIndex: "client_name",

      render: (_, record) => (
<Link to={`/id/${record.client_id}`}>{record.client_fio}</Link>
      ),
    },

    {
      title: "Номер телефона",
      dataIndex: "client_phone_number",
    },

    {
      title: "Дата рождения",
      dataIndex: "client_birthday",
      render: (_, record) => {
        if (record.client_birthday){
          return  <span>
          {dayjs(record.client_birthday).format("DD.MM.YYYY")} (
          {dayjs(record.client_birthday).fromNow(true)})
        </span>
        } else {
          return <span>Не указана</span>
        }
      }
    },
    {
      title: "Управление",
      dataIndex: "edit",
      render: (_, record) => {
        if (role === "super_coach") {
          return <DeletePerson record={record} deletePerson={deleteCoach} />
        }
      }
    
    },
  ];

  return (
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {`Профессия:${record.client_job}  Жалобы:${record.client_illness}
           `}
                </p>
              ),
            }}
            dataSource={coachList}
            rowKey={(clientList) => clientList.client_id}
            onChange={onChange}
          />
  );
};
export default CoachListTable;
