import React from "react"
import { toTitleCase, VanType } from "../../Util.js"
import { Link, useSearchParams } from "react-router"
import { getVans } from "../../api"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [filter, setFilter] = useSearchParams()
    let { current } = React.useRef(false)
    const typeFilter = filter.get("type")

    async function fetchVans() {
        setLoading(true)
        try {
            const data = await getVans()
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
        return vans
            .filter((van) => { 
                return !typeFilter ? true : van.type.toLowerCase().includes(typeFilter.toLowerCase()) 
            })
            .map((van) => {
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
                <div key={van.id} className="van-item">
                    <Link to={van.id}>  
                        <img src={van.imageUrl} className="van-item-img"/>
                        <div className="van-item-info">
                            <div className="van-item-info-leading">
                                <h3 className="van-item-name">{van.name}</h3>
                                <span style={{...style}} className="van-item-type">{toTitleCase(van.type)}</span>
                            </div>
                            <div className="van-item-info-trailing">
                                <h3 className="van-item-price">{`$${van.price}`}</h3>
                                <p>/day</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )})
    }
    
    function createFilterOptions() {
        return Object.values(VanType).map((t, i) => {
            let style = {}
            if (t.value === typeFilter) {
                style = { 
                    backgroundColor: t.color,
                    color: "white" 
                }
            }
            return (
                <button key={i} style={{...style}} className="vans-filter-option" onClick={() => { handleFilterChange("type", t.value)}}>
                    <span>{toTitleCase(t.value)}</span>
                </button>
            )
        }) 
    }

    function handleFilterChange(key, value) {
        setFilter((oldFilter) => {
            if (value === null) {
                oldFilter.delete(key)
            } else {
                oldFilter.set(key, value)
            }
            return oldFilter
        })
    }

    return (
        <main className="vans-main">
            <h1 className="vans-title">Explore our van options</h1>
            <div className="vans-filters-container">
                <div className="vans-filter-options-container">{createFilterOptions()}</div>
                {typeFilter && <button className="vans-filter-clear-btn" onClick={() => { handleFilterChange("type", null)}}>Clear filters</button>}
            </div>
            <section className="vans-items-container">{createVanItems()}</section>
        </main>
    )
}