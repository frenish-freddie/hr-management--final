import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userSeniority = (localStorage.getItem("seniority") || "").toLowerCase();

  if (!token) return <Navigate to="/login" replace />;

  // If role is required, check if user is "senior"
  if (role && !userSeniority.includes("senior")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
