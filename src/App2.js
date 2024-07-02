import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Layout } from "antd";
import SignInPage from "./components/SignInPage";
import App from "./App";
import axios from "axios";
import { instance } from "./request";
import { useNavigate } from "react-router-dom";
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
          <Link to="/">Расписание</Link>
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
          <Route path="/" element={<App />}></Route>
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
