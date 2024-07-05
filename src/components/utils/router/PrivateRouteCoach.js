import { Navigate, Outlet } from "react-router-dom"

const PrivateRouteCoach = () => {
    
    const role = JSON.parse(localStorage.getItem("data") || '{ }')

    if(!role.role) {
        return <Navigate to={"/profile"} />
    } 

    if (role.role === "coach") {
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