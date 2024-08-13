import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();
    function GoHome () {
        navigate("/"); 
    }
    return (
  <Result
    status="404"
    title="404"
    subTitle="Страница не найдена."
    extra={<Button type="primary" onClick={GoHome}>На главную</Button>}
  />
)};
export default NotFound;