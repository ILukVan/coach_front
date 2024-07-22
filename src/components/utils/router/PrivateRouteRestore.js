import { Navigate, Outlet } from "react-router-dom"


const PrivateRouteRestore = () => {
    

    const restore = localStorage.getItem("restore")
    const email = localStorage.getItem("email")


    if(!restore && !email) {
        localStorage.clear()
        return <Navigate to={"/sign"} />
    } else {
        return <Outlet email={email}/>
    }


}



export default PrivateRouteRestore;