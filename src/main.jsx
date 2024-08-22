import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Error from './components/Error.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Car from './components/Car.jsx'
import Cars from './components/Cars.jsx'
import Dashboard from './components/Dashboard.jsx'
import Admin from '../../crazy-car-main/src/components/admin/Admin.jsx'
import UpdateCar from '../../crazy-car-main/src/components/admin/UpdateCar.jsx'
import Logout from '../../crazy-car-main/src/components/Logout.jsx'
import User from '../../crazy-car-main/src/components/admin/User.jsx'
import Caradmin from '../../crazy-car-main/src/components/admin/Caradmin.jsx'
import Addcar from '../../crazy-car-main/src/components/admin/Addcar.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signUp' element={<SignUp />} />
      <Route path='car' element={<Cars />} />
      <Route path='logout' element={<Logout />} />
      <Route path='update-car/:id' element={<UpdateCar />} />
      <Route path='admin' element={<Admin />} >
        <Route path='user' element={<User />} />
        <Route path='caradmin' element={<Caradmin />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='addcar' element={<Addcar />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
