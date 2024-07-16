import React from "react";
import { Layout, theme, Space, Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Content } = Layout;

const SuperCoach = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const role = useSelector((state) => state.rootReducer.sign.user.role);
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
              {role === "coach" && 
              <p>
                Управление клиентами: удалить или изменить анкету клиента.
              </p> }
              {role === "super_coach" && 
              <p>
                Управление клиентами: удалить или изменить анкету клиента,
                сделать клиента тренером.
              </p>}
              <Link to="/management/client">Управление</Link>
            </Card>
            {role === "super_coach" && (
              <Card title="Список тренеров" size="small">
                <p>Управление тренерами: удалить или изменить анкету тренера.</p>
                <Link to="/management/coach">Управление</Link>
              </Card>
            )}
            {role === "super_coach" && (
              <Card title="Редактор тренировок" size="small">
                <p>Редактор тренировок: создать, удалить или изменить тип тренировок.</p>
                <Link to="/management/workout">Управление</Link>
              </Card>
            )}
          </Space>
        </div>
      </Content>
    </Layout>
  );
};
export default SuperCoach;
