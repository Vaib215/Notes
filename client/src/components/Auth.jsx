import { Link, useNavigate } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"
import http from '../services/httpService.js';
import Alert from "./Alert";
import { useState } from "react";

const Auth = ({ type }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (type === "login") {
            await http.post('/auth/login', {
                email: e.target.email.value,
                password: e.target.password.value
            })
                .then(res => {
                    setIsAuthenticated(true)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem("isLoggedIn", "true")
                    setTimeout(() => {
                        setIsAuthenticated(null)
                        navigate("/home")
                    }, 1000) 
                })
                .catch(err => {
                    setIsAuthenticated(false)
                    setError(err.response.data.message)
                    setTimeout(() => {
                        setIsAuthenticated(null)
                    }, 1000) 
                })
        }
        else {
            await http.post('/auth/register', {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
                .then(res => {
                    setIsAuthenticated(true)
                    setTimeout(() => {
                        setIsAuthenticated(null)
                        navigate('/login')
                    }, 1000)
                })
                .catch(err => {
                    setIsAuthenticated(false)
                    setError(err.response.data.message)
                    setTimeout(() => {
                        setIsAuthenticated(null)
                    }, 1000) 
                })
        }
    }
    // Show password if checkbox is checked
    const showPassword = (e) => {
        const password = document.getElementById('password')
        if (e.target.checked) {
            password.type = "text"
        }
        else {
            password.type = "password"
        }
    }
    return (
        <>
            <Breadcrumb nav={`/${type}`} home/>
            <div className="hero min-h-[90vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        {(type === "login") ? (
                            <>
                                <h1 className="text-5xl font-bold">Welcome back!</h1>
                                <p className="py-6">Continue your notes-making journey by logging into your account.</p>
                            </>) : (
                            <>
                                <h1 className="text-5xl font-bold">Welcome!</h1>
                                <p className="py-6">Begin your notes-making journey by creating a new account.</p>
                            </>)}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {!(type === "login") && (<div className="form-control">
                                    <label className="label" htmlFor="name">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="John Doe" className="input input-bordered" />
                                </div>)}
                                <div className="form-control">
                                    <label className="label" htmlFor="email">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" name="email" id="email" placeholder="john@doe.com" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" id="password" name="password" placeholder="your ultra safe password" className="input input-bordered" />
                                    <label className="cursor-pointer label justify-start gap-2">
                                        <input onClick={showPassword} id="shw-pass" type="checkbox" className="checkbox checkbox-sm" />
                                        <label htmlFor="shw-pass" className="label-text-alt">Show password</label>
                                    </label>
                                </div>
                                {!(type === "login") && (
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input type="password" placeholder="can you write it again" className="input input-bordered" />
                                    </div>
                                )}
                                <div className="form-control mt-6">
                                    {(type === "login") ? (
                                        <>
                                            <button type="submit" className="btn btn-primary w-full">Login</button>
                                            <p className="text-center mt-4">
                                                <Link to="/register" className="link link-tertiary">Create an account</Link>
                                            </p>
                                        </>) : (
                                        <>
                                            <button type="submit" className="btn btn-primary w-full">Register</button>
                                            <p className="text-center mt-4">
                                                <Link to="/login" className="link link-tertiary">Already have an account? Login</Link>
                                            </p>
                                        </>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {isAuthenticated === true &&
                <Alert type="success" message={type === "login" ? "You have logged in successfully!" : "Account has been created successfully!"} />
            }
            {isAuthenticated === false &&
                <Alert type="error" message={error} />
            }
        </>
    )
}

export default Auth