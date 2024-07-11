import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouteCoach = () => {
    

    const role =  useSelector((state) => state.rootReducer.sign.user.role);
    const user =  useSelector((state) => state.rootReducer.sign.user);

    console.log(user, 'asdasdfgadg');

    if(!role) {
        console.log(role);
            console.log("tut redirect&");
        return <Navigate to={"/sign"} />


    } 

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