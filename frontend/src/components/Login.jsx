import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(value));
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password , role:"user"};

    axios
      .post("http://localhost:3000/auth/login", loginData)
      .then((res) => {
        // alert(res.data.message);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message || "Login failed. Try again.";
        alert(errorMsg);
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
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 3,
          // backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#1976d2", mb: 2, textAlign: "center" }}
        >
          Welcome Back
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            // required
            fullWidth
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Email <MailOutlineIcon fontSize="small" />
              </Box>
            }
            variant="outlined"
            value={email}
            onChange={handleEmail}
            error={emailError}
            helperText={emailError ? "Enter a valid email address" : " "}
            sx={{ mb: 2 }}
          />

          <TextField
            // required
            fullWidth
            type="password"
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Password <KeyIcon fontSize="small" />
              </Box>
            }
            variant="outlined"
            value={password}
            onChange={handlePassword}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!email || !password || emailError}
          >
            Log In
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Forgot Password?{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => navigate("/forgot-password")}
          >
            click here
          </Button>
        </Typography>

        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Don't have an account?{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
