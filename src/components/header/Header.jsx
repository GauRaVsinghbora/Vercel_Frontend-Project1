import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutApi } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slice/auth/authSlice';


export default function Header() {
    const isAuthenticated = useSelector(state => state.auth.status);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout= async()=>{
        const response = await logoutApi();
        if (response){
            dispatch(logout())
            navigate('/')
        }
    }
    const navItems = [
        {   
            name: 'Home',
            to: '/',
            active: true
        },
        {   
            name: 'About',
            to: '/about',
            active: true
        },
        {
            name: 'Contact Us',
            to: '/contact',
            active: true
        },
        {   
            name: 'Github',
            to: '/github',
            active: isAuthenticated
        }
    ]
    const loginLogoutItems = [
        {
            name: 'Login',
            to: '/login',
            active: !isAuthenticated
        },
        {
            name: 'Get Started',
            to: '/get-started',
            active: !isAuthenticated
        },
        {
            name: 'logout',
            active: isAuthenticated
        }
    ] 
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="logo.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {loginLogoutItems.map((item)=>(
                            item.active ? (
                                item.name === 'logout'?(
                                    <button
                                        key={item.name}
                                        onClick={onLogout}
                                        className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                    >
                                        {item.name}
                                    </button>
                                ):(
                                <Link 
                                    key={item.name} 
                                    to={item.to}
                                    className={item.name === 'Get Started' ? "text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none":"text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"}
                                >
                                    {item.name}
                                </Link>
                            )
                            ) : null
                        ))}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {
                                navItems.map((item)=>(
                                    item.active ? (
                                        <li key={item.name}>
                                            <NavLink 
                                                to={item.to}
                                                className={({isActive}) =>
                                                    `${isActive?"text-orange-700":"text-gray-700"} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>
                                ):null))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
