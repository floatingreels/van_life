import React from "react"
import { Link } from "react-router"
import { getHostVans } from "../../api"

export default function HostVans() {

    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    let { current } = React.useRef(false)
        
    async function fetchVans() {
        setLoading(true)
        try {
            const data = await getHostVans()
            setVans(data)
        } catch(e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }
        
    React.useEffect(() => { 
            if (current) { return }
            current = true
            fetchVans()
        }, 
        []
    )

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>Oops, something went wrong... {error.message}</h1>
    }

    function createVanItems() {
        return vans.map((van) => {
            return (
                <div key={van.id} className="host-van-item">
                    <Link to={van.id}>  
                    <div className="host-van-item-container">
                        <img src={van.imageUrl} className="host-van-item-img"/>
                        <div className="host-van-item-info">
                            <h3 className="host-van-item-name">{van.name}</h3>
                            <p className="host-van-item-price">{`$${van.price}/day`}</p>
                        </div>
                    </div>
                    </Link>
                </div>
            )
        })
    }
    return (
        <main>
            <h1>Your listed vans</h1>
            {createVanItems()}
        </main>
    )
}