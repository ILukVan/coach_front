import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Layout, Space } from "antd";
import SignInPage from "./components/SignInPage";
import App from "./components/forClients/Client";
import { instance } from "./request";
import Coach from "./components/forCoaches/Coach";
import SuperCoach from "./components/forSuperCoach/SuperCoach";
import ClientList from "./components/forSuperCoach/ClientList";
import CoachList from "./components/forSuperCoach/CoachList";
import WorkOutList from "./components/forSuperCoach/WorkOutList";
import { useSelector, useDispatch } from "react-redux";
import PrivateRouteCoach from "./components/utils/router/PrivateRouteCoach";
import { login } from "./components/store/slice/signIn";
import { jwtDecode } from "jwt-decode";
import PrivateRouteAdmin from "./components/utils/router/PrivateRouteAdmin";

const { Header, Footer } = Layout;

function App2() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("tokens") !== null &&
      dispatch(
        login(jwtDecode(JSON.parse(localStorage.getItem("tokens")).token))
      );
  }, []);

  const navigate = useNavigate();
  // console.log(jwtDecode(JSON.parse(localStorage.getItem("tokens")).token));

  const handleLogOut = async () => {
    console.log("logOut");
    const logout = await instance.get("/logout");

    if (logout.statusText === "OK") {
      localStorage.removeItem("tokens");
      localStorage.removeItem("data");
      dispatch(login({}));
      navigate("/profile");
    }
  };

  const name = useSelector((state) => state.rootReducer.sign.user.name);
  const role = useSelector((state) => state.rootReducer.sign.user.role);

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
          <Space size={"large"}>
            <Link to="/">Расписание</Link>
            {role === "coach" && <Link to="/coach">Редактор расписания</Link>}
            {role === "super_coach" && <Link to="/coach">Редактор расписания</Link>}

            {role === "coach" && <Link to="/management">Управление</Link>}
            {role === "super_coach" && <Link to="/management">Управление</Link>}

            {name ? (
              <Link to="/logout" onClick={handleLogOut}>
                Выйти
              </Link>
            ) : (
              <Link to="/profile">Профиль</Link>
            )}
            <span style={{ color: "yellow" }}>{name} {role}</span>
          </Space>
        </Header>
        <Routes>
          <Route path="/profile" element={<SignInPage />}></Route>
          <Route path="/" element={<App />}></Route>

          <Route element={<PrivateRouteCoach />}>
            <Route path="/coach" element={<Coach />}></Route>
            <Route path="/management" element={<SuperCoach />}></Route>
            <Route path="/management/client" element={<ClientList />}></Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/management/coach" element={<CoachList />}></Route>
              <Route
                path="/management/workout"
                element={<WorkOutList />}
              ></Route>
            </Route>
          </Route>
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
