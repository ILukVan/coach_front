import axios from "axios";


export const instance = axios.create({
  // к запросу будет приуепляться cookies
  //   withCredentials: true,
  baseURL: process.env.REACT_APP_Api_url,
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


      localStorage.setItem(
        "tokens",
        JSON.stringify(error.response.data)
      );


      // localStorage.setItem("token", error.response.data.accessToken);
      //   // переотправляем запрос с обновленным accessToken

      return instance.request(originalConfigRequest);
    } else if (error.response.data === "необходим перелогин" && error.response.status === 403){
      localStorage.removeItem("tokens")
      

    } else {
      console.log("токен протух");
      // window.location.reload()
    }

    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    return Promise.reject(error);
  }
);
