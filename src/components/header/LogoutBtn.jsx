import React from 'react'
import {useDispatch} from 'react-redux'
import { logout as logoutSlice } from '../../slice/auth/authSlice.js'
import { logout as logoutApi } from '../../api/authApi.js'

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
            logoutApi()
            .then(()=>{
                dispatch(logoutSlice())
            })
            .catch(err=>{
                console.log(err);
            })
    }
    return (
        <button 
        onClick={logoutHandler} 
        className=' bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
        >Logout</button>
    )
}

export default LogoutBtn
