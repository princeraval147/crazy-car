import React from 'react'

const SignUp = () => {
    return (
        <>
            <div class="sign">
                <form class="form" action="">
                    <h1>Create Your Account</h1>
                    <label for="">Username : </label>
                    <input
                        className='inputFeild'
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Your Name"
                        required
                    />

                    <label for="">Email :</label>
                    <input
                        className='inputFeild'
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter Email Address"
                        required
                    />

                    <label for="">Password :</label>
                    <input
                        className='inputFeild'
                        type="password"
                        name=""
                        id=""
                        placeholder="••••••••••••••••"
                        required
                    />

                    <label for="">Confirm Password :</label>
                    <input
                        className='inputFeild'
                        type="password"
                        name=""
                        id=""
                        placeholder="Re-Enter Password"
                        required
                    />
                    <div>
                        <button type="submit">Sign Up</button>

                        <a href="#" className="">Forgot password?</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp
