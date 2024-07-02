import axios from "axios";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
export const instance = axios.create({
  // к запросу будет приуепляться cookies
  //   withCredentials: true,
  baseURL: "http://localhost:3500/",
});

instance.interceptors.request.use((config) => {

  config.headers.Authorization = `Bearer ${localStorage.getItem("tokens")}`;
  return config;
});

// instance.interceptors.request.use(async (config) => {
//   const token =  await localStorage.getItem("tokens")
//   return {
//       ...config,
//       headers: { ...config.headers, Authorization: `Bearer ${token}` }
//   }
// })

// instance.interceptors.response.use(
//   // в случае валидного accessToken ничего не делаем:
//   (config) => {
//     return config;
//   },
//   // в случае просроченного accessToken пытаемся его обновить:
//   async (error) => {
//     // предотвращаем зацикленный запрос, добавляя свойство _isRetry
//     const originalRequest = { ...error.config };
//     originalRequest._isRetry = true;

//     console.log(error.config, "config");
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       //     // // проверим, что запрос не повторный
//       //     // error.config &&
//       //     // !error.config._isRetry
//       try {
//         console.log(error.response.data, "<------------------------ 36 данные с сервера");
//         localStorage.setItem("tokens", error.response.data);
//         console.log(localStorage.getItem("tokens"), '<------------------------------- 38 данные с свервера в localStorage');
//         //   localStorage.setItem("token", resp.data.accessToken);
//         //   // переотправляем запрос с обновленным accessToken

//         // return instance.request({
//         //   ...originalRequest,
//         //   headers: {
//         //     ...originalRequest.headers,
//         //     Authorization: `Bearer ${JSON.stringify(error.response.data)}`,
//         //   },
//         // });
//       } catch (error) {
//         console.log("AUTH ERROR");
//       }
//     }
//     // на случай, если возникла другая ошибка (не связанная с авторизацией)
//     // пробросим эту ошибку
//     throw error;
//   }
// );

// Добавляем перехват ответов
instance.interceptors.response.use(
  function (response) {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    return response;
  },
  function (error) {

    // console.log(error.response);
    const originalConfigRequest = { ...error.config };
    // originalConfigRequest._isRetry = true;

    if (error.response.status === 401) {
      localStorage.setItem("tokens", JSON.stringify(error.response.data));

      // localStorage.setItem("token", error.response.data.accessToken);
      //   // переотправляем запрос с обновленным accessToken

      return instance.request(originalConfigRequest);
    } else {
      console.log("я тут");
      <Navigate to="/profile" />
    }

    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    return Promise.reject(error);
  }
);
