import React, { use, useState } from 'react';
import { Link, Links, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const [error,setError] = useState("")
    const {LogIn} = use(AuthContext)
    const location = useLocation()
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        e.preventDefault()
        const form = e.target 
        const email = form.email.value 
        const password = form.password.value

        LogIn(email,password).then(result=>{
            console.log(result)
            navigate(`${location.state? location.state : "/"}`)
        })
        .catch(error=>{
            // console.log(error.message)
            setError(error.message)
        })
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Login your account</h2>
                <form action="" onSubmit={handleLogin}>
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" required />
                            <label className="label">Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" required />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            {
                                error && <p>{error} </p>
                            }
                            <button className="btn btn-neutral mt-4">Login</button>
                            
                            <p className='font-semibold text-center pt-5'>Dont’t Have An Account ? <Link className='text-secondary' to="/auth/register">Register</Link> </p>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;