import { useOutletContext } from "react-router";

export default function HostVanPricing() {

    const van = useOutletContext();

    return (
        <div className="host-van-detail-pricing">
            <p><span>{`$${van.price}`}</span>/day</p>
        </div>
    )
}