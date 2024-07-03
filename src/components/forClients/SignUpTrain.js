import React from 'react';
import { Button } from 'antd';
const SignUpTrain = () => {
 
    const signUp = () => {
        console.log("Нажал записаться");
    }


    return (

    <Button onClick={signUp}>Записаться</Button>

    )
};
export default SignUpTrain;