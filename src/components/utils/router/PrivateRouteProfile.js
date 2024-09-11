import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteProfile = () => {

    const role = useSelector((state) => state.rootReducer.sign.user.role);


    if(!role) {
        console.log("tut5");
        
        return <Navigate to={"/sign"} />
    } 

    if (role === "client") {
        return <Outlet />
    }

    if (role === "coach" || role === "super_coach") {
        return <Outlet />
    } else {
        console.log("tut6");
        return <Navigate to={"/sign"} />
    }
}

export default PrivateRouteProfile

