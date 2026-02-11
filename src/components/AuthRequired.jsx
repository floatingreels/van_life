import { Outlet, Navigate, useLocation } from "react-router"
import { useAuth } from "./AuthContext.jsx"

export default function AuthRequired() {
    const location = useLocation()
    const { loggedIn } = useAuth()
    
    if (loggedIn) {
        return <Outlet />
    } else {
        return (
            <Navigate
                to="/login"
                state={{fromPath: location.pathname, message: "You must login before accessing this page."}}
                replace={true}
            />
        )
    }
}