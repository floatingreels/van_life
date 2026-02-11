import { useOutletContext } from "react-router";

export default function HostVanPhotos() {
    
    const van = useOutletContext();

    return (
        <div className="host-van-detail-photos">
            <img src={van.imageUrl} />
        </div>
    )
}