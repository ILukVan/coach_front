import { Navigate, Outlet } from "react-router-dom"

const PrivateRouteClient = () => {

    const role = JSON.parse(localStorage.getItem("tokens") || '{ }')

    if(!role) {
        return <Navigate to={"/sign"} />
    } 

    if (role.role === "client") {
        return <Outlet />
    } 
}

export default PrivateRouteClient