import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteAdmin = () => {
    

    const role = useSelector((state) => state.rootReducer.sign.user.role);

    if(!role) {
        console.log("tut redirect%%%");
        return <Navigate to={"/sign"} />
    } 

    if (role === "super_coach") {
        return <Outlet />
    } 
  
    // switch (role.role) {
    //     case 'coach':
    //     return <Outlet />
    //     default:
    //     console.log(`Sorry, we are out of .`);
    // }
}



export default PrivateRouteAdmin