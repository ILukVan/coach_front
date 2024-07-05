import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signInSlice  from "./slice/signIn";


const rootReducer = combineReducers({
    sign: signInSlice,
  });

const store  = configureStore ( {
    reducer: {
        rootReducer
    },
})

export default store