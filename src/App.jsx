import React from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      {/* <h1>Car Supporter</h1> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App