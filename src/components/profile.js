import React, { useEffect, useState } from "react";
import { Card, Layout, theme } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../request";
import ModalEditProfile from "./modalEditProfile ";
import ProfileTrain from "./profileTrain";
import { useDispatch } from "react-redux";
import { login } from "./store/slice/signIn";
const { Content } = Layout;

const Profile = () => {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams();
  useEffect(() => {
    getUserData();
  }, [id]);

  const [clientData, setClientData] = useState({});
  // ---------------------------------------запрос профиля ----------------------------
  const getUserData = async () => {
    let idClient = { id: await id };
    const data = await instance.post("/profile", idClient);

    setClientData(data.data);
  };
  // ---------------------------------------запрос профиля ----------------------------

  // ---------------------------------------изменить профиль ----------------------------
  const updateProfile = async (values) => {
    values.client_id = id;
    const data = await instance.put("/update_profile", values);

    setClientData(data.data);
    dispatch(
      login())
  };
  // ---------------------------------------изменить профиль ----------------------------

 
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
            <ModalEditProfile
              record={clientData}
              updateProfile={updateProfile}
            />
            <div><ProfileTrain /></div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};
export default Profile;
