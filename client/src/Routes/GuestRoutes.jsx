import { useContext } from "react"
import { Navigate,Outlet } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const GuestRoutes = () => {

    const {user} = useContext(UserContext)

    return !user.email ? <Outlet />: <Navigate to="/dashboard" />
  
 
}

export default GuestRoutes;

