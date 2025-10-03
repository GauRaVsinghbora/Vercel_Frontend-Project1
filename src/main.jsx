import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements,} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import {LandingPage,Home,AllPosts,YourPosts, Login,Signup, About, Contact,VerifyOtp} from './pages'
import Protected from './components/AuthLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<Home />} >
        <Route index element={<AllPosts/>} />
        <Route path="your-posts" element={<YourPosts/>} />
      </Route>
      <Route path="/login" element={
        <Protected authentication={false}>
          <Login/>
        </Protected>
      }/>
      <Route path="/get-started" element={
        <Protected authentication={false}>
          <Signup/>
        </Protected>
      }/>
      <Route path="/verify-otp" element={
        <Protected authentication={false}>
          <VerifyOtp/>
        </Protected>
      }/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>

)
