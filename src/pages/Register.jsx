import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext)
    const [error, setError] = useState("")

    const navigate = useNavigate()


    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const photo = form.photo.value

        if (name.length < 5) {
            setError("Name must be at least 5 character")
            return
        }
        else {
            setError("");
        }


        // console.log({name,email,password,photo})

        createUser(email, password).then(result => {
            // console.log(result.user)
            const user = result.user
            updateUser({ displayName: name, photoURL: photo }).then(() => {
                setUser({ ...user, displayName: name, photoURL: photo })
                navigate("/")
            }).catch((error) => {
                // An error occurred
                // ...
                console.log(error)
                setUser(user)
            });

        })
            .catch(error => {
                console.log(error.message)
            })

    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Register your account</h2>
                <form onSubmit={handleRegister} action="">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Name" required />
                            <label className="label">Photo URL</label>
                            <input type="text" name='photo' className="input" placeholder="Photo URL" />
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" required />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" required />


                            {
                                error && <p className='text-center text-secondary'>{error} </p>
                            }

                            <button type='submit' className="btn btn-neutral mt-4">Register</button>
                            <p className='font-semibold text-center pt-5'>Already Have An Account ? <Link className='text-secondary' to="/auth/login">Login</Link> </p>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;