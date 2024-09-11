import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const SignUpTrain = ({record, signUpTrain}) => {

  const role = useSelector((state) => state.rootReducer.sign.user.role);


  const navigate = useNavigate();

  const signUp = () => {


    if (!role) {
      console.log("tut1");
      navigate("/sign");
     
    } 
    if (role === "client" ) {
      signUpTrain(record)

    }
  };
  if (role !== "coach") {
    return <Button style={{background:"#A8E4A0"}} onClick={signUp}>Записаться</Button>;
  }
  
};
export default SignUpTrain;
