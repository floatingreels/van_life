import React from "react"

const AuthContext = React.createContext()

export default function AuthProvider({ children }) {

    const [loggedIn, setLoggedIn] = React.useState(() => { return localStorage.getItem("loggedIn") === "true" })

    function login() {
        setLoggedIn(true)
        localStorage.setItem("loggedIn", true)
    }

    function logout() {
        setLoggedIn(false)
        localStorage.setItem("loggedIn", false)
    }

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (context) {
        return context
    } else {
        throw new Error("useAuth only to be called within AuthProvider")
    }
}