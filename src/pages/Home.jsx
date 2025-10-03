import React from 'react'
import { Button } from './../components'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {LandingPage} from './index'

function Home() {
    const authStatus = useSelector(state=>state.auth.status);
    return authStatus?(
        <div className="relative mx-auto w-full max-w-7xl min-h-[700px]">
            <div className="flex justify-around items-center border-b border-black/10 py-6 px-4 sm:px-6 lg:px-8">
                <NavLink to='/' className={({isActive})=>`${isActive?"text-orange-700":"text-gray-700"} text-sg font-medium hover:text-orange-700`} >All Posts</NavLink>
                <div>/</div>
                <NavLink to='/your-posts' className={({isActive})=>`${isActive?"text-orange-700":"text-gray-700"} text-sg font-medium hover:text-orange-700`}>Your Posts</NavLink>
            </div>
            <Outlet/>
            {/* create post button*/}
            <Button
                label="Create Post"
                className="w-[200px] bg-orange-700 hover:bg-orange-800 absolute bottom-5 left-1/2 transform -translate-x-1/2"
            />
        </div> 
    ):(<LandingPage/>)
}

export default Home
