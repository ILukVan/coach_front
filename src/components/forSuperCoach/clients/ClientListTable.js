import React from "react";
import { Table } from "antd";
import MakeCoach from "./makeCoach";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DeletePerson from "../DeletePerson";
import { useSelector } from "react-redux";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const ClientListTable = ({ clientList, createCoach, deleteClient }) => {
  const onChange = (pagination, filters, sorter, extra) => {};
  const role = useSelector((state) => state.rootReducer.sign.user.role);
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
        if (role === "super_coach"){
          return <>
          <MakeCoach record={record} createCoach={createCoach} />
          <DeletePerson deletePerson={deleteClient} record={record}/>
          </>
        } else {
          return  <DeletePerson deletePerson={deleteClient} record={record}/>
        }
      }
    },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <>
          <p
            style={{
              margin: 15,
            }}
          >
            {`Профессия: ${record.client_job ? record.client_job : "Не указана"} 
           `}
          </p>
                    <p
                    style={{
                      margin: 15,
                    }}
                  >
                     {`Жалобы: \t ${record.client_illness ? record.client_illness : "Не указаны"}
                   `}
                  </p>
                  </>
        ),
      }}
      dataSource={clientList}
      rowKey={(clientList) => clientList.client_id}
      onChange={onChange}
    />
  );
};
export default ClientListTable;
