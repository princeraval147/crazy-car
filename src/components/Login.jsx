import React from 'react';
import '../index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                navigate('/dashboard');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <>
            <div className="login">
                <div className="loginBox">
                    <h1 className="loginHeading">
                        Log in to your account
                    </h1>
                    <form
                        className="loginForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="email">Your email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            className="inputFeild"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span>Email is required</span>}

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="inputFeild"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span>Password is required</span>}

                        <div className="rf">
                            <div className="remember">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    {...register('remember')}
                                />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className='Btn'>Sign in</button>
                        <p>
                            Don't have an account yet?
                            <NavLink to='/signUp'> Sign Up</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
