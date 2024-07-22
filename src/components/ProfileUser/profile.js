import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../../request";
import ModalEditProfile from "./modalEditProfile ";
import UserCard from "./userCard";
import VisitedTrains from "./VisitedTrains";
import ModalEditProfilePassword from "./modalEditProfilePassword";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, profile } from "../store/slice/signIn";
import "./profile.css";
const { Content } = Layout;

const Profile = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  const idCurrent = useSelector((state) => state.rootReducer.sign.user.id);

  const { id } = useParams();


  useEffect(() => {
    if (role==="client" && idCurrent !== id) {
      localStorage.removeItem("tokens");
      localStorage.removeItem("data");
      dispatch(logout());
      navigate("/sign");
    } else {
    getUserData();
}}, [id]);

  const [clientData, setClientData] = useState({});
  const [visitedtTrains, setVisitedtTrains] = useState([]);
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
    if (id === idCurrent) {
      const user ={
        id: idCurrent,
        role: role,
        name: data.data.client_fio,
      }
      dispatch(profile(user))
  

    }
    setClientData(data.data);
  };
  // ---------------------------------------изменить профиль ----------------------------
    // ---------------------------------------изменить пароль ----------------------------
    const updatePassword = async (values) => {
      values.client_id = id;
      if (id === idCurrent) {
        await instance.put("/update_password", values);
    };
  }
    // ---------------------------------------изменить пароль ----------------------------
  // --------------------------------------- запрос посещенных тренировок ----------------------------
  const visited_workouts = async () => {
    const client_id = {client_id: await id}
    const data = await instance.post("/visited_trains", client_id);
    setVisitedtTrains(data.data);
  };
  // --------------------------------------- запрос посещенных тренировок ----------------------------

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
          <div className="profile-card">
          <UserCard clientData={clientData} />
          <div className="profile-options">
            <ModalEditProfile
              record={clientData}
              updateProfile={updateProfile}
              idClient={id}
            />
          </div>
          {idCurrent === id && 
          <div className="profile-options"> 
          
          <ModalEditProfilePassword 
                        record={clientData}
                        updatePassword={updatePassword}
                        idClient={id}
                      />
          </div>}
          <div className="profile-options">
            
            <VisitedTrains
              visited_workouts={visited_workouts}
              visitedtTrains={visitedtTrains}
            />
          </div>

        </div>
        </div>
      </Content>
    </Layout>
  );
};
export default Profile;
