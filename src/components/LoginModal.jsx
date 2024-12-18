import { Box, FormControl, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: { xs: "90vw", sm: "70vw", md: "50vw", lg: "30vw" },
};

const LoginModal = (props) => {
  const { handleClose } = props;
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     handleClose();
  // };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        // const response = await fetch(
        //   "https://crazycar-backend.onrender.com/login",
        //   {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        console.log(result);
        navigate("/car");
      } else {
        alert("Invalid Email or Password", result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
    handleClose();
  };

  return (
    <Box sx={style}>
      <h4
        style={{
          fontSize: "30px",
          marginBottom: "24px",
          textDecoration: "underline",
        }}
      >
        Login to Your Account
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: "100%" }}>
          <input
            type="email"
            placeholder="Enter Email"
            className="inputFeild"
            required
            {...register("email", { required: true })}
          />
          {errors.email && <span className="errorMsg">Email is required</span>}
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <input
            placeholder="Password"
            type="password"
            className="inputFeild"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="errorMsg">Password is required</span>
          )}
        </FormControl>
        <button type="submit" color="primary" className="Btn">
          Login
        </button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <p style={{ color: "#333" }}>
          By Continuing I accept the Privacy Policy, Terms & Conditions.
        </p>
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <NavLink to="/signUp">Sign up</NavLink>
      </Typography>
    </Box>
  );
};

export default LoginModal;
