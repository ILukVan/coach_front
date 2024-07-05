import React from "react";
import { Button } from "antd";
import { instance } from "../../request";
import { useNavigate } from "react-router-dom";



const UnSignUpTrain = ({record}) => {

const unSignUpTrain = async (values) => {

    const data = await instance.post("/unsign_up_train", values);

  };


  const unSignUp = () => {

    unSignUpTrain(record)
    }
  

  return <Button onClick={unSignUp}>Отписаться</Button>;
};
export default UnSignUpTrain;
