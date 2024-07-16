import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { instance } from '../../request';
import ClientListTable from './ClientListTable';
import ClientListCard from './ClientListCard';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const ClientList = () => {
  const screen = useSelector((state) => state.rootReducer.screen.width);

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    const [clientList, setClientList] = useState([]);

// ------------------------------------- запрос всех клиентов--------------------
const fetchClients = async () => {
  const data = await instance.get("/client_list");

  setClientList(data.data);
};
// ------------------------------------- запрос всех клиентов--------------------
// ------------------------------------- сделать клиента тренером --------------------
const createCoach = async (values) => {
  const coach = await instance.post("/create_coach", values)
  setClientList(coach.data);
}  
// ------------------------------------- сделать клиента тренером --------------------


    useEffect(() => {
        fetchClients(); // функция которая делает запрос в сторе
      }, []);

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
            {screen >= 900 ?
      <ClientListTable clientList={clientList} createCoach={createCoach}/> :
      <ClientListCard clientList={clientList} createCoach={createCoach}/> }
</div>
      </Content>
    </Layout>

    )
};
export default ClientList;