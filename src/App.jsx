import React from "react"
import Header from './components/Header'
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <h1>Car Supporter</h1>
      <Header />
      <Outlet />
    </>
  )
}

export default App