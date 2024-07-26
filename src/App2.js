import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "antd";
import SignInPage from "./components/SignInPage";
import Client from "./components/forClients/Client";
import { instance } from "./request";
import Coach from "./components/forCoaches/Coach";
import SuperCoach from "./components/forSuperCoach/SuperCoach";
import ClientList from "./components/forSuperCoach/clients/ClientList";
import CoachList from "./components/forSuperCoach/coaches/CoachList";
import WorkOutList from "./components/forSuperCoach/workOut/WorkOutList";
import { useSelector, useDispatch } from "react-redux";
import PrivateRouteCoach from "./components/utils/router/PrivateRouteCoach";
import { login, logout as logoutAction } from "./components/store/slice/signIn";
import { screenWidth } from "./components/store/slice/signIn/widthScreen";
import PrivateRouteAdmin from "./components/utils/router/PrivateRouteAdmin";
import PrivateRouteProfile from "./components/utils/router/PrivateRouteProfile";
import Profile from "./components/ProfileUser/profile";
import Registration from "./components/Registration";
import SingIn from "./components/SignIn";
import "./App.css";
import Menu from "./menu";
import RestoreProfile from "./components/Restore/RestoreProfile";
import PrivateRouteRestore from "./components/utils/router/PrivateRouteRestore";
import NewPassword from "./components/Restore/NewPassword";

const { Header, Footer } = Layout;

function App2 () {
  const dispatch = useDispatch();

  useEffect( () => {
    localStorage.getItem("tokens") !== null && 
      dispatch(
        login()
      );
  }, []);

  const screen = useSelector((state) => state.rootReducer.screen.width);

  useEffect(() => {
    window.onresize = () => {
      dispatch(screenWidth(window.screen.width));
    };
    // Ваш код
    return () => {
      window.onresize = false;
    };
  }, [screen]);

  const navigate = useNavigate();

  const handleLogOut = async () => {

    const logout = await instance.get("/logout");

    if (logout.statusText === "OK") {
      localStorage.removeItem("tokens");
      localStorage.removeItem("data");
      dispatch(logoutAction());
      navigate("/");
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
         
          <div className="all-header">
            
            <div >
            {role ?
 <Menu role={role} name={name} id={id}/> :
 <Link to="/">
 Расписание
</Link>}
            </div>
<div className="header-Profile">

            {id ? (
              <Link to="#" onClick={handleLogOut}>
                Выйти
              </Link>
            ) : (
              <Link to="/sign">Вход</Link>
            )}
            </div>
            </div>

          
        </Header>
        <Routes>

          <Route path="/sign" element={<SignInPage />}></Route>
          <Route path="/restore" element={<RestoreProfile />}></Route>
          <Route path="/sign_in" element={<SingIn />}></Route>
          <Route path="/sign_up" element={<Registration />}></Route>
          <Route path="/" element={<Client />}></Route>


          <Route element={<PrivateRouteProfile />}>
          <Route path="/id/:id" element={<Profile />}></Route>
          </Route>
          <Route element={<PrivateRouteRestore />}>
          <Route path="/restore/new_password" element={<NewPassword />}></Route>
          </Route>
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
