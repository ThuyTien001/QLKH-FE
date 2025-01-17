import { isAuthenticated } from "@/constant";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang login
        return <Navigate to="/login" replace />;
    }
    // Nếu đã đăng nhập, render component con
    return <>{children}</>;
};

export default ProtectedRoute;
