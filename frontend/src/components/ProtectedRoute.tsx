import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

// ✅ Correct TypeScript type for React children
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // ✅ If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Otherwise, render the protected page (e.g., Dashboard)
  return <>{children}</>;
}
