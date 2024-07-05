import React from "react";
import { Button } from "antd";
import { instance } from "../../request";
import { useNavigate } from "react-router-dom";



const SignUpTrain = ({record}) => {

const signUpTrain = async (values) => {

    const data = await instance.post("/sign_up_train", values);

  };


  const role = JSON.parse(localStorage.getItem("data") || "{ }");
  const navigate = useNavigate();

  const signUp = () => {
    console.log("Нажал записаться");

    if (!role.role) {
        console.log("не зареган");
        console.log(record.training_id);
      navigate("/profile");
    } else {
      console.log("ты записался как зарегистрированный");
      signUpTrain(record)
    }
  };

  return <Button onClick={signUp}>Записаться</Button>;
};
export default SignUpTrain;
