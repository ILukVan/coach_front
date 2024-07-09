import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteCoach = () => {
    

    const role = useSelector((state) => state.rootReducer.sign.user.role);

    if(!role) {
        return <Navigate to={"/profile"} />
    } 
    console.log(role);
    if (role === "coach" || role === "super_coach") {
        return <Outlet />
    } 
  
    // switch (role.role) {
    //     case 'coach':
    //     return <Outlet />
    //     default:
    //     console.log(`Sorry, we are out of .`);
    // }
}



export default PrivateRouteCoach