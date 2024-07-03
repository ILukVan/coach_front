import { Navigate, Outlet } from "react-router-dom"

const PrivateRouteClient = () => {

    let role = JSON.parse(localStorage.getItem("tokens")).role

    if (role === "client") {
        return <Outlet />
    } else {
        return <Navigate to={"/profile"} />
    }
}

export default PrivateRouteClient