import { Navigate, Outlet } from "react-router-dom"

const PrivateRouteCoach = () => {

    let role = JSON.parse(localStorage.getItem("tokens")).role

    if (role === "coach") {
        return <Outlet />
    } else {
        return <Navigate to={"/profile"} />
    }
}

export default PrivateRouteCoach