import React from "react"
import { useParams } from "react-router"
import { toTitleCase, VanType } from "../../Util.js"
import { getVan } from "../../api"


export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    let { current } = React.useRef(false)
    const { id } = useParams()

    async function fetchVanDetail() {
        setLoading(true)
        try {
            const data = await getVan(id) 
            console.log(data)
            setVan(data)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => { 
            if (current) { return }
            current = true
            fetchVanDetail()
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
        let style = {}
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

        return ( 
            <main>
                <div className="van-detail">
                    <img src={van.imageUrl} className="van-detail-img"/>
                    <div className="van-detail-info">
                        <span style={{...style}} className="van-detail-type">{toTitleCase(van.type)}</span>
                        <h3 className="van-detail-name">{van.name}</h3>        
                        <div className="van-detail-price">
                            <h3>{`$${van.price}`}</h3>
                            <p>/day</p>
                        </div>
                        <p className="van-detail-description">{van.description}</p>
                    </div>
                </div>
            </main>
        )
    } else {
        return <p>Loading</p>
    }
}