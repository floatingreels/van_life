import { Link } from "react-router"

export default function NotFound() {
    return (
        <main className="page-not-found">
            <h1>Sorry, the page you were looking for was not found.</h1>
            <Link className="return-home-button" to="/">Return to home</Link>
        </main>
    )
}