import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signInSlice  from "./slice/signIn";
import  screenSlice  from "./slice/signIn/widthScreen";


const rootReducer = combineReducers({
    sign: signInSlice,
    screen: screenSlice,
  });

const store  = configureStore ( {
    reducer: {
        rootReducer
    },
})

export default store