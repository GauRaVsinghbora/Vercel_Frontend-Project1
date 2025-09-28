import React, { useState } from 'react'
import { useForm} from 'react-hook-form'
import Input  from '../Input'
import Button from '../Button'
import { useNavigate,Link } from 'react-router-dom'
import { signup } from '../../api/authApi'


function SignUp() {
    const [ error,setError ] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const create = async (data)=>{
        setError("")
        try{
            localStorage.setItem("Email", data.email);
            const response = await signup(data);
            if (response){
                navigate('/verify-otp')
            }
        }catch(err){
            setError(err.response?.data.message); 
        }
    }
    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                        >
                        login
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                        label="userName"
                        placeholder="Enter UserName"
                        type='text'
                        {...register('username',{
                            required: true,
                        })}
                    /> 
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
                        label="password"
                        type="password"
                        {...register("password",{
                            required:true
                        })}
                        placeholder="Create Password"
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        label="Create Account"
                    />
                </div>
            </form>
            </div>
        </div>
    )
}

export default SignUp
