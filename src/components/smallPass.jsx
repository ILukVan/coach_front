import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Popover, Badge, Avatar, Space } from 'antd';
import { instance } from "../request";
import pass from '../components/pass.png'

const SmallPass = () => {
    const [smallPassList, setSmallPassList] = useState([])
    useEffect(() => {
        getSmallPass()

    }, [])


      // ---------------------------------------запрос тренировок по дате ----------------------------
  const getSmallPass = async (values) => {
    const data = await instance.get("/small_pass");
    setSmallPassList(data.data)
  };
  // ---------------------------------------запрос тренировок по дате ----------------------------

  const content = (
    smallPassList.map((item) => 
      <li key={item.client_id}>
        <Space>
        <Link to={`/id/${item.client_id}`}>{item.client_fio}: {item.client_pass}</Link>
        </Space>
        </li>
    )
);
    return (
  <Popover content={content} title="Мало занятий" trigger="click">
    <Badge count={smallPassList.length}>
      <Avatar  src={pass}/>
    </Badge>
  </Popover>
   
)};

export default SmallPass;