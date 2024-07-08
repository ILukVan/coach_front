import React, { useEffect, useState } from "react";
import { Table, Layout, theme } from "antd";
import { instance } from "../../request";
import DeletePerson from "./DeletePerson";
const { Content } = Layout;

const CoachList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [coachList, setCoachList] = useState([]);

  const fetchCoach = async () => {
    const data = await instance.get("/coach_list");
    console.log("my clients");

    setCoachList(data.data);
  };

  const deleteCoach = async (id) => {
  const deleteCoach = await instance.delete("/delete_coach", {
    data: { id: id },

  });
  setCoachList(deleteCoach.data);
}

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };



  useEffect(() => {
    fetchCoach(); // функция которая делает запрос в сторе
  }, []);

  const columns = [
    {
      title: "Имя клиента",
      dataIndex: "client_name",

      render: (_, record) => (
        <span>{`${record.client_name !== null ? record.client_name : ""} ${
          record.client_patronymic !== null ? record.client_patronymic : ""
        }  ${
          record.client_surname !== null ? record.client_surname : ""
        }`}</span>
      ),
    },

    {
      title: "Номер телефона",
      dataIndex: "client_phone_number",
    },

    {
      title: "Дата рождения",
      dataIndex: "client_birthday",
    },
    {
      title: "Управление",
      dataIndex: "edit",
      render: (_, record) => (
        <>
        <DeletePerson record={record} deletePerson={deleteCoach} />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
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
        </div>
      </Content>
    </Layout>
  );
};
export default CoachList;
