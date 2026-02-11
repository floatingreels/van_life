import React from "react"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../components/AuthContext.jsx"
import { loginUser } from "../api.js"
import { FormStatus } from "../Util.js"

export default function Login() {
    const [formData, setFormData] = React.useState({email: "", password: ""})
    const [status, setStatus] = React.useState(FormStatus.IDLE)
    const [error, setError] = React.useState(null)
    const { loggedIn, login, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    
    function onInputChanged(event) {
        const { name, value } = event.target
        setFormData((prevForm) => {
                return {...prevForm, [name]: value}
        })
    }

    function onFormSubmitted(event) {
        event.preventDefault()
        setError(null)
        setStatus(FormStatus.SUBMITTING)
        performLogin(formData)
    }

    async function performLogin(creds) {
        try {
            const data = await loginUser(creds)
            login()
            navigate(location?.state?.fromPath ?? "/host", { replace: true })
        } catch(e) {
            setError(e)
            logout()
        } finally {
            setStatus(FormStatus.IDLE)
        }
    } 

    return (
        <main className="login-main">
            { loggedIn 
                ? <div className="logout-container">
                    <p>You are currently logged in. Welcome back!</p>                    
                    <button onClick={logout}>Log out</button>
                </div>
                : <div className="login-form-container">
                    {location?.state?.message && <h1 className="login-form-error">{location?.state?.message}</h1>}
                    <p>Please enter your name and password</p>
                    <form onSubmit={onFormSubmitted} className="login-form">
                        <input name="email" type="email" placeholder="jane_john@doe.com" value={formData.email} onChange={onInputChanged}/>
                        <input name="password" type="password" value={formData.password} onChange={onInputChanged}/>
                        <button disabled={status === FormStatus.SUBMITTING}>{status === FormStatus.SUBMITTING ? "Logging in..." : "Log in"}</button>
                    </form>
                    {error?.message && <h1 className="login-form-error">{error?.message}</h1>}
                </div>}
        </main>
    )
}