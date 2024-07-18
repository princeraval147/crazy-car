import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import Error from './components/Error.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='' element={<Home />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signUp' element={<SignUp />} />
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
