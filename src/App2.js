import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import SignInPage from "./components/SignInPage";
import App from "./components/forClients/Client";
import { instance } from "./request";
import { useNavigate } from "react-router-dom";
import Coach from "./components/forCoaches/Coach";
import SuperCoach from "./components/forSuperCoach/SuperCoach";
import ClientList from "./components/forSuperCoach/ClientList";
import PrivateRouteClient from "./components/utils/router/PrivateRouteClient";
import PrivateRouteCoach from "./components/utils/router/PrivateRouteCoach";
const { Header, Footer } = Layout;

function App2() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    console.log("logOut");
    const logout = await instance.get("/logout");

    if (logout.statusText === "OK") {
      localStorage.removeItem("tokens");
      navigate("/profile");
    }
  };

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Link to="/">Расписание Клиентов</Link>
          <Link to="/coach">Расписание Тренеров</Link>
          <Link to="/management">Управление</Link>
          {/* <Link to="/management/client">Управление клиентами</Link> */}
          {JSON.parse(localStorage.getItem("tokens")) ? (
            <Link to="/logout" onClick={handleLogOut}>
              Выйти
            </Link>
          ) : (
            <Link to="/profile">Профиль</Link>
          )}
        </Header>
        <Routes>
          <Route path="/profile" element={<SignInPage />}></Route>
          <Route element={<PrivateRouteClient />}>
            <Route path="/" element={<App />}></Route>
          </Route>
          <Route element={<PrivateRouteCoach />}>
          <Route path="/coach" element={<Coach />}></Route>
          </Route>
          <Route path="/management" element={<SuperCoach />}></Route>
          <Route path="/management/client" element={<ClientList />}></Route>
        </Routes>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default App2;
