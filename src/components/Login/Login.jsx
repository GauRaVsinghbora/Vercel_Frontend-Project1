import React, { useState } from 'react'
import {useNavigate,Link } from 'react-router-dom'
import { login } from '../../slice/auth/authSlice.js'
import  Input  from '../Input.jsx'
import Button from '../Button.jsx'
import { useDispatch } from 'react-redux'
import { login as LoginApi } from '../../api/authApi.js'
import { getUser } from '../../api/userApi.js'
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [loading , setLoading] = useState(false); 
    const [error, setError ] = useState(null)

    const create = async (data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await LoginApi(data);
            if (response){
                const useData = await getUser();
                if(useData) dispatch (login(useData));
                toast.success("Login");
                navigate('/')
            }
        }catch (err) {
            setError(err.response?.data.message); 
        } finally{
            // ensure loading is reset no matter succes/fail
            setLoading(false);
        }
    }

    return (
        <div
            className='flex item-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to='/get-started'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                        >
                        Sign up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={ handleSubmit(create) } className='mt-8' >
                    <div className='space-y-5'>
                        <Input 
                            label='Email'
                            placeholder='Enter your email'
                            type='email'
                            {...register('email',{
                                required: true,
                                validate: {
                                    matchPattern:(value) =>{
                                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || 'Email address must be a valid address'
                                    }
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password",{
                                required:true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            label={loading ? 'Logging in...': 'Login'}
                        /> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
