import React, { useEffect, useState } from 'react';
import { Button, Layout, notification, theme } from 'antd';
import { instance } from '../../../request';
import ClientListTable from './ClientListTable';
import ClientListCard from './ClientListCard';
import { useSelector } from 'react-redux';
import SearchClient from './SearchClient';
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

// ------------------------------------- создать два пробника --------------------
const createProbnik = async () => {
  try {
  await instance.get("/registration_probnik");
  notification.success({
    message: "Успех!",
    description: "Пробники успешно добавлены",
  });
  await fetchClients();
  } catch {
    notification.error({
      message: "Ошибка!",
      description: "Достигнуто предельное количество пробных профилей",
    });
  }
}
// ------------------------------------- создать два пробника --------------------
// ------------------------------------------запрос удалить клиента ------------------------------
const deleteClient = async (id) => {

  const deleteCoach = await instance.delete("/delete_client", {
    data: { id: id },

  });
  setClientList(deleteCoach.data);
}
// ------------------------------------------запрос удалить клиента ------------------------------

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
        
            <SearchClient clientList={clientList} />
            <Button onClick={createProbnik} className="select-picker">Создать 2 пробника</Button>
            
            {screen >= 900 ?
            
      <ClientListTable clientList={clientList} createCoach={createCoach} deleteClient={deleteClient}/> :
      <ClientListCard clientList={clientList} createCoach={createCoach} deleteClient={deleteClient}/> }
</div>
      </Content>
    </Layout>

    )
};
export default ClientList;