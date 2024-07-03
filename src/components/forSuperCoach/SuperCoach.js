import React from "react";
import { Layout, theme, Space, Card, Button } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { instance } from "../../request";


const { Content } = Layout;

const SuperCoach = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [clientList, setClientList] = useState([]);

  const fetchClients = async () => {
    const data = await instance.get("/client_list");

    setClientList(data.data);
  };



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
  <Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}
  >
    <Card title="Список клиентов" size="small">
      <p>Card content</p>
      <p>Card content</p>
      <Button>Ldd</Button>
      <Link to="/management/client">Управление</Link>
    </Card>
    <Card title="Список тренеров" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Редактор тренировок" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>

        </div>
      </Content>
    </Layout>
  );
};
export default SuperCoach;