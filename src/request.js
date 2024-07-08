import axios from "axios";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "./components/store/slice/signIn";



export const instance = axios.create({
  // к запросу будет приуепляться cookies
  //   withCredentials: true,
  baseURL: "http://localhost:3500/",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("tokens")}`;
  return config;
});

// Добавляем перехват ответов
instance.interceptors.response.use(
  
  function (response) {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    return response;
  },
  function (error) {
    
    const originalConfigRequest = { ...error.config };
    // originalConfigRequest._isRetry = true;

    if (error.response.status === 401) {
    
      // localStorage.setItem("tokens", JSON.stringify(error.response.data));
      console.log(jwtDecode(error.response.data.tokens.token));
      // dispatch(login(jwtDecode(error.response.data.tokens.token)));
      localStorage.setItem(
        "tokens",
        JSON.stringify(error.response.data.tokens)
      );
      localStorage.setItem("data", JSON.stringify(error.response.data.data));

      // localStorage.setItem("token", error.response.data.accessToken);
      //   // переотправляем запрос с обновленным accessToken

      return instance.request(originalConfigRequest);
    } else {
      console.log("я тут");
      <Navigate to="/profile" />;
    }

    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    return Promise.reject(error);
  }
);
