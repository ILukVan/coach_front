import React, {useState } from "react";
import { Layout, theme, notification } from "antd";
import { instance } from "../../request";
import { useNavigate } from "react-router-dom";
import RestoreEmail from "./RestoreEmail";
import RestoreEmailAndCode from "./RestoreEmailAndCode";

const { Content } = Layout;

const RestoreProfile = () => {

const [restoreEmail, SetRestoreEmail] = useState()
const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

// ----------------------------------------------- отправить код подтверждения ------------
  const sendEmailCode = async (values) => {


    try {
      const email = await instance.post("/restore_profile", values);
      if (email.status === 200) {
        localStorage.setItem("restore", true);
        localStorage.setItem("email", email.data);
      }
      SetRestoreEmail(email.data)
      notification.success({
        message: "Успех!",
        description: " Код отправлен, проверте почту!",
      });
    } catch {
      notification.error({
        message: "Ошибка!",
        description: "Email не найден",
      });
    }
  };
// ---------------------------------------------- отправить код подтверждения ------------
// ----------------------------------------------- повторный код подтверждения ------------
const reSendEmailCode = async (values) => {

  const emailToSend = {
    email: values,
  }
  try {
    await instance.post("/restore_profile", emailToSend);
    notification.success({
      message: "Успех!",
      description: "Проверте почту! Код отправлен снова",
    });
  } catch {
    notification.error({
      message: "Ошибка!",
      description: "Не удалось отправить код",
    });

  }
};
// ---------------------------------------------- повторный код подтверждения ------------
// ----------------------------------------------- верификация код подтверждения ------------
const sendCodeAndEmail = async (values) => {


  try {
    const verifyCode = await instance.post("/verify_code", values);
    if (verifyCode.status === 200) {
      navigate("/restore/new_password");
    }

  } catch {
    notification.error({
      message: "Ошибка!",
      description: "Неверный код восстановления",
    });

  }
};
// ---------------------------------------------- верификация код подтверждения ------------
// ----------------------------------------------- Отмена восстановления  ------------
const cancelRestore = () => {
  localStorage.clear()
  navigate("/sign");
};
// ---------------------------------------------- Отмена восстановления ------------


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
          {localStorage.getItem("restore") ? <RestoreEmailAndCode sendCodeAndEmail={sendCodeAndEmail}
          restoreEmail={restoreEmail} reSendEmailCode={reSendEmailCode} cancelRestore={cancelRestore}/>: <RestoreEmail sendEmailCode={sendEmailCode}/>}
        </div>
      </Content>
    </Layout>
  );
};
export default RestoreProfile;
