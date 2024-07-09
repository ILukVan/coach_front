import React from "react";
import { Button } from "antd";
import { instance } from "../../request";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const SignUpTrain = ({record}) => {

  const role = useSelector((state) => state.rootReducer.sign.user.role);

const signUpTrain = async (values) => {

    const data = await instance.post("/sign_up_train", values);

  };


  
  const navigate = useNavigate();

  const signUp = () => {
    console.log("Нажал записаться");

    if (!role) {
        console.log("не зареган");
        console.log(record.training_id);
      navigate("/profile");
    } 
    if (role === "client" ) {
      console.log("ты записался как зарегистрированный");
      signUpTrain(record)
    }
  };
  if (role !== "coach") {
    return <Button onClick={signUp}>Записаться</Button>;
  }
  
};
export default SignUpTrain;
