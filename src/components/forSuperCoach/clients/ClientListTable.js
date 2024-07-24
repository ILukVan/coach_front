import React from "react";
import { Table } from "antd";
import MakeCoach from "./makeCoach";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DeletePerson from "../DeletePerson";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const ClientListTable = ({ clientList, createCoach, deleteClient }) => {
  const onChange = (pagination, filters, sorter, extra) => {};

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
      render: (_, record) => (
        <span>
          {dayjs(record.client_birthday).format("DD.MM.YYYY")} (
          {dayjs(record.client_birthday).fromNow(true)})
        </span>
      ),
    },
    {
      title: "Управление",
      dataIndex: "edit",
      render: (_, record) => (
        <>
        <MakeCoach record={record} createCoach={createCoach} />
        <DeletePerson deletePerson={deleteClient} record={record}/>
        </>
      ),
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
      dataSource={clientList}
      rowKey={(clientList) => clientList.client_id}
      onChange={onChange}
    />
  );
};
export default ClientListTable;
