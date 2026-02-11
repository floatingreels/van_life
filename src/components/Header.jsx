import { NavLink } from "react-router"
import { FaRegCircleUser, FaCircleUser } from "react-icons/fa6";
import { useAuth } from "./AuthContext.jsx"


export default function Header() {

    const { loggedIn } = useAuth()
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function getActiveStyle(obj) {
        return obj.isActive ? activeStyle : null
    }

    return (
        <header className="global-header">
            <h1>#VANLIFE</h1>
            <nav className="global-nav-bar">
                <NavLink style={getActiveStyle} to="/" >Home</NavLink>
                <NavLink style={getActiveStyle} to="host" >Host</NavLink>
                <NavLink style={getActiveStyle} to="about" >About</NavLink>
                <NavLink style={getActiveStyle} to="login" >{loggedIn ? <FaCircleUser/> : <FaRegCircleUser/>}</NavLink>
            </nav>
      </header>
    )
}