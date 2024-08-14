import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitFun = async (data) => {
        console.log(data);
        if (data.password === data.conformPassword) {
            try {
                const response = await fetch('http://localhost:5000/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        userName: data.userName,
                        email: data.email,
                        password: data.password
                    })
                });

                const result = await response.json();
                if (result.success) {
                    navigate('/login');
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.log('Error during signup:', error);
                alert('An error occurred during signup.');
            }
        } else {
            alert("Confirm Password doesn't match");
        }
    };

    return (
        <>
            <div className="sign">
                <form className="form" onSubmit={handleSubmit(onSubmitFun)} method='POST'>
                    <h1>Create Your Account</h1>

                    <label htmlFor="userName">Username:</label>
                    <input
                        className="inputFeild"
                        type="text"
                        id="userName"
                        placeholder="Enter Your Name"
                        {...register('userName', { required: true })}
                    />
                    {errors.userName && <span className='error'>Username is required</span>}

                    <label htmlFor="email">Email:</label>
                    <input
                        className="inputFeild"
                        type="email"
                        id="email"
                        placeholder="Enter Email Address"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span className='error'>Email is required</span>}

                    <label htmlFor="password">Password:</label>
                    <input
                        className="inputFeild"
                        type="password"
                        id="password"
                        placeholder="••••••••••••••••"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <span className='error'>Password is required</span>}

                    <label htmlFor="conformPassword">Confirm Password:</label>
                    <input
                        className="inputFeild"
                        type="password"
                        id="conformPassword"
                        placeholder="Re-Enter Password"
                        {...register('conformPassword', { required: true })}
                    />
                    {errors.conformPassword && <span className='error'>Confirm Password is required</span>}

                    <div>
                        <button type="submit" className='Btn'>Sign Up</button>
                        <a href="#">Forgot password?</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
