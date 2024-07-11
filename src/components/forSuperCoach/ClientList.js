import React, { useEffect, useState } from 'react';
import { Table, Layout, theme } from 'antd';
import { instance } from '../../request';
import MakeCoach from './makeCoach';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const ClientList = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    const [clientList, setClientList] = useState([]);

    const fetchClients = async () => {
        const data = await instance.get("/client_list");

        setClientList(data.data);
      };

      const onChange = (pagination, filters, sorter, extra) => {

      };


    const createCoach = async (values) => {
        const coach = await instance.post("/create_coach", values)
        setClientList(coach.data);
    }  



    useEffect(() => {
        fetchClients(); // функция которая делает запрос в сторе
      }, []);

 
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

        }, 
        {
        title: "Управление",
        dataIndex: "edit",
        render: (_, record) => (
           <MakeCoach record={record} createCoach={createCoach}/>
          ),
        },
    ]



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
        dataSource={clientList}
        rowKey={(clientList) => clientList.client_id}
        onChange={onChange}
      />

</div>
      </Content>
    </Layout>

    )
};
export default ClientList;