import React from "react";
import { Button } from "antd";


const UnSignUpTrain = ({record, unSignUpTrain}) => {



  const unSignUp = () => {

    unSignUpTrain(record)
    }
  

  return <Button onClick={unSignUp}>Отписаться</Button>;
};
export default UnSignUpTrain;
