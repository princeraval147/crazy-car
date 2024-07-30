import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {

    const [input, setInput] = useState({
        Email: "",
        Pass: ""
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <>
            <div className="login">
                <div className="loginBox">
                    <h1 className="loginHeading">
                        Log in to your account
                    </h1>
                    <form
                        className="loginForm"
                        action="#"
                        onSubmit={handlerSubmit}
                    >
                        <label htmlFor="Email">Your email</label>
                        <input
                            id='Email'
                            name="Email"
                            onChange={e => setInput({
                                ...input,
                                [e.target.name]: e.target.value
                            })}
                            type="email"
                            value={input.Email}
                            className="inputFeild"
                            placeholder="Enter Email"
                            required
                        />
                        <label htmlFor="Pass">Password</label>
                        <input
                            onChange={e => setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                            })}
                            value={input.Pass}
                            type="password"
                            name="Pass"
                            id="Pass"
                            placeholder="••••••••"
                            className="inputFeild"
                            required
                        />
                        <div className="rf">
                            <div className="remember">
                                <div>
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        required="" />
                                </div>
                                <div>
                                    <label htmlFor="remember" className="">Remember me</label>
                                </div>
                            </div>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className='Btn'>Sign in</button>
                        <p>
                            Don't have an account yet?
                            <NavLink to='/signUp' className='link'> Sign Up</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
