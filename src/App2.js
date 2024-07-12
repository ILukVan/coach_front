import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Layout, Space } from "antd";
import SignInPage from "./components/SignInPage";
import Client from "./components/forClients/Client";
import { instance } from "./request";
import Coach from "./components/forCoaches/Coach";
import SuperCoach from "./components/forSuperCoach/SuperCoach";
import ClientList from "./components/forSuperCoach/ClientList";
import CoachList from "./components/forSuperCoach/CoachList";
import WorkOutList from "./components/forSuperCoach/WorkOutList";
import { useSelector, useDispatch } from "react-redux";
import PrivateRouteCoach from "./components/utils/router/PrivateRouteCoach";
import { login, logout as logoutAction } from "./components/store/slice/signIn";
import PrivateRouteAdmin from "./components/utils/router/PrivateRouteAdmin";
import Profile from "./components/profile";
import Registration from "./components/Registration";
import SingIn from "./components/SignIn";
import "./App.css";
import ActivityClientList from "./components/forClients/activityClientList";

const { Header, Footer } = Layout;

function App2 () {
  const dispatch = useDispatch();

  useEffect( () => {
    localStorage.getItem("tokens") !== null && 
      dispatch(
        login()
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
      dispatch(logoutAction());
      navigate("/sign");
    }
  };

  const name = useSelector((state) => state.rootReducer.sign.user.name);
  const role = useSelector((state) => state.rootReducer.sign.user.role);
  const id = useSelector((state) => state.rootReducer.sign.user.id);

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
    
          <Space size={"large"}>
            <div >
            <Link to="/">Расписание</Link>

            {role === "coach" && <Link to="/coach">Редактор расписания</Link>}
            {role === "super_coach" && <Link to="/coach">Редактор расписания</Link>}

            {role === "coach" && <Link to="/management">Управление</Link>}
            {role === "super_coach" && <Link to="/management">Управление</Link>}
            </div>
<div className="header-Profile">
            {name ? (
              <Link to="/logout" onClick={handleLogOut}>
                Выйти
              </Link>
            ) : (
              <Link to="/sign">Профиль</Link>
            )}
            <Link to={`/id/${id}`}>{name}</Link>
            </div>
       

          </Space>
        </Header>
        <Routes>
          <Route path="/sign" element={<SignInPage />}></Route>
          <Route path="/sign_in" element={<SingIn />}></Route>

          <Route path="/sign_up" element={<Registration />}></Route>
          <Route path="/" element={<Client />}></Route>
            <Route path="/id/:id" element={<Profile />}></Route>
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
