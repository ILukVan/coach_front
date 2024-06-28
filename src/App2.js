import { Routes, Route, Link } from "react-router-dom";
import { Layout } from 'antd';
import SignInPage from "./components/SignInPage"; 
import App from "./App";
const { Header, Footer } = Layout;

function App2() {


    return(
        <>
 <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Link to="/">Расписание</Link>
        <Link to="/profile">Профиль</Link>

      </Header>
      <Routes>
          <Route path='/profile' element={<SignInPage />}></Route>
          <Route path='/' element={<App />}></Route>
        </Routes>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
        </>
    )
    
}

export default App2;