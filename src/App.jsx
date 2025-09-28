import React from 'react'
import { getUser } from './api/userApi.js';
import {useDispatch} from 'react-redux';
import { login,logout } from './slice/auth/authSlice.js';
import {Header,Footer} from './components';
import { Outlet } from 'react-router-dom';
import { ToastContainer} from "react-toastify";


function App() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    getUser()
    .then(
      (res) =>{
        if(res){
          dispatch(login(res.data));
        } else {
          dispatch(logout());
        }
      }
    ).catch((err) => {
      console.error(err);
      dispatch(logout());
    })
    .finally(() => setLoading(false));
  });

  return !loading?(
    <div className="app">
      <ToastContainer position="top-center"  pauseOnFocusLoss closeOnClick hideProgressBar={false} newestOnTop={false} pauseOnHover  autoClose={2000} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ):<p>Loading...</p>
}

export default App
