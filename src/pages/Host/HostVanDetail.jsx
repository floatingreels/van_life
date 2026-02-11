import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router"
import { toTitleCase, VanType } from "../../Util.js"
import { getHostVans } from "../../api"

export default function HostVanDetail() {

    const [van, setVan] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    let { current } = React.useRef(false)
    const { id } = useParams()
    let style = {}

    async function fetchHostVanDetail() {
        setLoading(true)
        try {
            const data = await getHostVans(id)
            console.log(data)
            setVan(data[0])
        } catch(e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }
    
    React.useEffect(() => { 
            if (current) { return }
            current = true
            fetchHostVanDetail()
        }, 
        []
    )

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>Oops, something went wrong... {error.message}</h1>
    }

    if (van != null) {
        switch (van.type) {
        case VanType.SIMPLE.value:
            style = { backgroundColor: VanType.SIMPLE.color }
            break;
        case VanType.RUGGED.value:  
            style = { backgroundColor: VanType.RUGGED.color }
            break; 
        case VanType.LUXURY.value:  
            style = { backgroundColor: VanType.LUXURY.color }
            break; 
        default: break;
    }
        
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function getActiveStyle(obj) {
        return obj.isActive ? activeStyle : null
    }

    return ( 
        <>
            <Link to=".." relative="path" className="back-button">
                    &larr; <span>Back to all vans</span>
            </Link>
            <div className="host-van-detail">
                <header className="host-van-detail-header">
                        <img src={van.imageUrl} className="host-van-detail-header-img"/>
                        <div className="host-van-detail-header-info">
                            <span style={{...style}} className="van-detail-header-type">{toTitleCase(van.type)}</span>
                            <h3 className="van-detail-header-name">{van.name}</h3>        
                            <div className="van-detail-header-price">
                                <h3>{`$${van.price}`}</h3>
                                <p>/day</p>
                            </div>
                        </div>
                </header>
                <nav className="host-van-deatil-nav">
                    <NavLink style={getActiveStyle} to="." end>Details</NavLink>
                    <NavLink style={getActiveStyle} to="pricing">Pricing</NavLink>
                    <NavLink style={getActiveStyle} to="photos">Photos</NavLink>
                </nav>
                <Outlet context={van} />
            </div>
        </>
    )
    } else {
        return <p>Loading</p>
    }
}