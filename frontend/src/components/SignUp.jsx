import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

const SignUp = () => {
  const [step, setStep] = useState("signup");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(value));
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    setPasswordError(!passwordRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = { name, email, password, role: "user", };

    axios
      .post("http://localhost:3000/auth/signup", signupData)
      .then((res) => {
        alert(res.data.message);
        setStep("otp");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Signup failed");
      });
  };

  const handleVerifyOtp = () => {
    axios
      .post("http://localhost:3000/auth/verify-otp", { email, otp })
      .then((res) => {
        // alert("OTP verified successfully");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "OTP verification failed");
      });
  };

  const handleResendOtp = () => {
    axios
      .post("http://localhost:3000/auth/resend-otp", { email })
      .then((res) => {
        alert("OTP resent to your email.");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to resend OTP.");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 450,
          width: "100%",
          p: 4,
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        {step === "signup" ? (
          <>
            <Typography
              variant="h4"
              sx={{ color: "#1976d2", mb: 2, textAlign: "center" }}
            >
              Create Account
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                // required
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Name <BadgeIcon fontSize="small" />
                  </Box>
                }
                variant="outlined"
                sx={{ mb: 2 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                // required
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Email <MailOutlineIcon fontSize="small" />
                  </Box>
                }
                variant="outlined"
                sx={{ mt: 1 }}
                value={email}
                onChange={handleEmail}
                error={emailError}
                helperText={emailError ? "Enter a valid email address" : " "}
              />

              <TextField
                fullWidth
                // required
                type="password"
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Password <KeyIcon fontSize="small" />
                  </Box>
                }
                variant="outlined"
                value={password}
                onChange={handlePassword}
                error={passwordError}
                helperText={passwordError ? "Min 6 chars, 1 uppercase" : " "}
                // sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  !name || !email || !password || emailError || passwordError
                }
              >
                Sign Up
              </Button>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{" "}
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{ color: "#1976d2", mb: 2, textAlign: "center" }}
            >
              OTP Verification
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!otp}
              onClick={handleVerifyOtp}
              sx={{ mb: 2 }}
            >
              Verify OTP
            </Button>

            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default SignUp;
