import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    console.log("is it logged in? :", isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes