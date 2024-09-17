import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteCoach = () => {
    

    const role =  useSelector((state) => state.rootReducer.sign.user.role);


    if(!role) {

        return <Navigate to={"/sign"} />


    } 

    if (role === "coach" || role === "super_coach") {
        return <Outlet />
    } 
  

}



export default PrivateRouteCoach