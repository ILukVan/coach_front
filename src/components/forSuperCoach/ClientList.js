import React, { useEffect, useState } from 'react';
import { Table, Layout, theme } from 'antd';
import { instance } from '../../request';
import MakeCoach from './makeCoach';

const { Content } = Layout;

const ClientList = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    const [clientList, setClientList] = useState([]);

    const fetchClients = async () => {
        const data = await instance.get("/client_list");
        console.log("my clients");
        console.log(data.data, "<--------------------- my clients");
        setClientList(data.data);
      };

      const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      };


    const createCoach = async (values) => {
        const coach = await instance.post("/create_coach", values)
        console.log(coach);
    }  

    const onClick = (value) => {
        console.log(value);
        console.log("prereeeess");
    }

    useEffect(() => {
        fetchClients(); // функция которая делает запрос в сторе
      }, []);

 
    const columns = [
        {
          title: "Имя клиента",
          dataIndex: "client_name",

          render: (_, record) => (
            <span>{`${record.client_name !== null? record.client_name : "" } ${record.client_patronymic !== null? record.client_patronymic : ""}  ${record.client_surname !== null? record.client_surname : ""}`}</span>
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