import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteAdmin = () => {
    

    const role = useSelector((state) => state.rootReducer.sign.user.role);

    if(!role) {
        console.log("tut2");
        return <Navigate to={"/sign"} />
    } 

    if (role === "super_coach") {
        return <Outlet />
    } 
  
}



export default PrivateRouteAdmin