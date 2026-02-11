import { useOutletContext } from "react-router";
import { toTitleCase } from "../../Util.js"

export default function HostVanInfo() {

    const van = useOutletContext();

    return (
        <div className="host-van-detail-info">
            <p><span>Name: </span>{van.name}</p>
            <p><span>Category: </span>{toTitleCase(van.type)}</p>
            <p><span>Description: </span>{van.description}</p>
        </div>
    )
}