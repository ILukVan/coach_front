import React from "react";
import { Card } from "antd";


const UserCard = ({clientData, role}) => {

    return ( 
        <Card title={clientData.client_fio}>
            <p>Дата рождения:
            {" "}{clientData.client_birthday ? clientData.client_birthday : "Не указана"}{" "}
            </p>
            <p>Номер телефона: {clientData.client_phone_number}</p>
            <p>
              Тип работы:{" "}
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
            {clientData.client_job !== "тренер студии" &&
            <p>Абонемент: {clientData.client_pass}</p>
          }
             </Card>
    )
}
export default UserCard;