import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./components/Products";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main child={<Home />} />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Main child={<Products />} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
