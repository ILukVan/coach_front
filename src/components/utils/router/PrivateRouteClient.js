import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteClient = () => {

    const role = useSelector((state) => state.rootReducer.sign.user.role);

    if(!role) {
        return <Navigate to={"/sign"} />
    } 

    if (role === "client") {
        return <Outlet />
    } 
}

export default PrivateRouteClient