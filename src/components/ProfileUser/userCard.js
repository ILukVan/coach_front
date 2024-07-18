import React from "react";
import { Card } from "antd";


const UserCard = ({clientData}) => {

    return ( 
        <Card title={clientData.client_fio}>
            <p>Дата рождения: {clientData.client_birthday}</p>
            <p>Номер телефона: {clientData.client_phone_number}</p>
            <p>
              Профессия:{" "}
              {clientData.client_job ? clientData.client_job : "Не указана"}{" "}
            </p>
            <p>
              Жалобы:{" "}
              {clientData.client_illness
                ? clientData.client_illness
                : "Не указаны"}{" "}
            </p>
            <p>
              E-mail:{" "}
              {clientData.client_email ? clientData.client_email : "Не указан"}{" "}
            </p>
            <p>Дата регистрации: {clientData.client_registration_date} </p>
             </Card>
    )
}
export default UserCard;