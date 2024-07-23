import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const Navigate = useNavigate();

    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: "",
        conformPassword: ""
    });

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.table(input)
        if (input.password === input.conformPassword) {
            Navigate('/login');
        }
        else {
            alert("Conform Password Can't Match");
        }
    }


    return (
        <>
            <div className="sign">
                <form className="form" action="" onSubmit={handlerSubmit}>
                    <h1>Create Your Account</h1>
                    <label htmlFor="userName">Username : </label>
                    <input
                        className='inputFeild'
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter Your Name"
                        required
                        value={input.userName}
                        onChange={e => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                    />

                    <label htmlFor="email">Email :</label>
                    <input
                        className='inputFeild'
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email Address"
                        required
                        value={input.email}
                        onChange={e => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                    />

                    <label htmlFor="password">Password :</label>
                    <input
                        className='inputFeild'
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••••••••••"
                        // required
                        value={input.password}
                        onChange={e => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                    />

                    <label htmlFor="conformPassword">Confirm Password :</label>
                    <input
                        className='inputFeild'
                        type="password"
                        name="conformPassword"
                        id="conformPassword"
                        placeholder="Re-Enter Password"
                        // required
                        value={input.conformPassword}
                        onChange={e => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                    />
                    <div>
                        <button type="submit" className='Btn'>Sign Up</button>

                        <a href="#">Forgot password?</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp
