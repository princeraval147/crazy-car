import {
    Box,
    Checkbox,
    FormControl,
    FormHelperText,
    OutlinedInput,
    Button,
    Typography,
    Link,
} from "@mui/material";
import React, { useState } from "react";
import modalStyles from "./LoginModal.module.css";

const style = {
    position: "absolute",
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email is required");
            return false;
        } else if (!emailPattern.test(email)) {
            setEmailError("Enter a valid email address");
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("Password is required");
            return false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (isEmailValid && isPasswordValid) {
            // Perform login logic here
            console.log("Login successful with email:", email);
            handleClose();
        }
    };

    return (
        <Box sx={style} className={`${modalStyles.box} flex flex-col items-center`}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Login to Your Account
            </Typography>
            <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                    id="outlined-adornment-email"
                    placeholder="Enter Email"
                    aria-label="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={validateEmail}
                    error={!!emailError}
                />
                {emailError && <FormHelperText error>{emailError}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ width: "100%", mt: 2 }}>
                <OutlinedInput
                    id="outlined-adornment-password"
                    placeholder="Password"
                    type="password"
                    aria-label="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    error={!!passwordError}
                />
                {passwordError && (
                    <FormHelperText error>{passwordError}</FormHelperText>
                )}
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2, width: "100%" }}
            >
                Login
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Forgot Password?{" "}
                <Link href="#" underline="hover">
                    Reset password
                </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link href="#" underline="hover">
                    Sign up
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginModal;
