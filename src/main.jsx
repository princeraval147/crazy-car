import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Error from "./components/Error.jsx";
import Cars from "./components/Cars.jsx";
import CarInfo from "./components/CarInfo.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import CarManage from "./components/Admin/CarManage.jsx";
import UpdateCar from "./components/Admin/UpdateCar.jsx";
import Addcar from "./components/Admin/Addcar.jsx";
import User from "./components/Admin/User.jsx";
import CarRatingAnalysis from "./components/Admin/CarRatingAnalysis.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="car" element={<Cars />} />
      <Route path="carinfo/:id" element={<CarInfo />} />
      <Route path="update-car/:id" element={<UpdateCar />} />
      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="carmanage" element={<CarManage />} />
          <Route path="addcar" element={<Addcar />} />
          <Route path="ratingAnalysis" element={<CarRatingAnalysis />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
