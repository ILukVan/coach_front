import React from "react";
import { Layout, theme, Space, Card, Button } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const SuperCoach = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
              display: "flex",
            }}
          >
            <Card title="Список клиентов" size="small">
              <p>Управление клиентами: удалить или изменить анкету клиента, перевести в тренера</p>
              <Link to="/management/client">Управление</Link>
            </Card>
            <Card title="Список тренеров" size="small">
              <p>Управление тренерами: удалить или изменить анкету тренера</p>
              <Link to="/management/coach">Управление</Link>
            </Card>
            <Card title="Редактор тренировок" size="small">
              <p>Card content</p>
              <Link to="/management/workout">Управление</Link>
            </Card>
          </Space>
        </div>
      </Content>
    </Layout>
  );
};
export default SuperCoach;
