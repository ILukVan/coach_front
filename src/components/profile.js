import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../request";
const Profile = () => {
  const { id } = useParams();
  useEffect(() => {
    getUserData();
  }, []);

  const [clientData, setClientData] = useState({})

  const getUserData = async () => {
    let idClient ={id: await id}
    console.log(idClient, " ------------- отправляю id------------");
    const data = await instance.post("/profile", idClient);

    setClientData(data.data)
  };

  console.log(clientData);
  return (
    <Card
      title={clientData.client_fio}
      style={{
        width: 400,
      }}
    >
      <p>Дата рождения: {clientData.client_birthday}</p>
      <p>Номер телефона: {clientData.client_phone_number}</p>
      <p>Профессия: {clientData.client_job ? clientData.client_job : "Не указана" } </p>
      <p>Жалобы: {clientData.client_illness ? clientData.client_illness : "Не указаны" } </p>
      <p>E-mail: {clientData.client_email ? clientData.client_email : "Не указан" } </p>
      <p>Дата регистрации: {clientData.client_registration_date} </p>
    </Card>
  );
};
export default Profile;
