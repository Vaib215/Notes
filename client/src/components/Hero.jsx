import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const Hero = ({ logout }) => {
    const [alert, setAlert] = useState(null)
    const doLogout = async () => {
        try {
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem("token")
            setAlert(true)
            setTimeout(() => {
                setAlert(null)
                window.location.href = "/"
            }, 1000)
        }
        catch (err) {
            setAlert(false)
            setTimeout(() => {
                setAlert(null)
            }, 1000)
        }
    }
    useEffect(() => {
        if (logout) {
            doLogout()
        }
    }, [logout])

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    {!logout && (<> <h1 className="text-5xl font-bold">All your <span className="text-primary">notes</span> under one roof!</h1>
                        <p className="py-6">Now store you notes easily on our app.</p>
                        <div className="flex justify-center gap-2">
                            <Link to='/login' className="btn btn-outline">Login</Link>
                            <Link to='/register' className="btn btn-primary">Register</Link>
                        </div></>)}
                    {logout && (
                        <>
                            <h1 className="text-5xl font-bold">Logging out...</h1>
                        </>
                    )}
                </div>
            </div>
            {alert === true && <Alert type="success" message="Logged out successfully" />}
            {alert === false && <Alert type="error" message="Error Logging out" />}
        </div>
    )
}

export default Hero;