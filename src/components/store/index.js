import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signInSlice  from "./slice/signIn";
import  screenSlice  from "./slice/signIn/widthScreen";
import restoreSlice from "./slice/signIn/restoreBool";


const rootReducer = combineReducers({
    sign: signInSlice,
    screen: screenSlice,
    restore: restoreSlice, 
  });

const store  = configureStore ( {
    reducer: {
        rootReducer
    },
})

export default store