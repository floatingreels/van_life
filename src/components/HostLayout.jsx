import { NavLink, Outlet } from "react-router"

export default function HostLayout() {

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function getActiveStyle(obj) {
        return obj.isActive ? activeStyle : null
    }
    
    return (
        <main>
            <nav className="host-nav">
                <NavLink style={getActiveStyle} to="." end>Dashboard</NavLink>
                <NavLink style={getActiveStyle} to="income">Income</NavLink>
                <NavLink style={getActiveStyle} to="vans">Vans</NavLink>
                <NavLink style={getActiveStyle} to="reviews">Reviews</NavLink>
            </nav>
            <Outlet />
        </main>
    )    
}