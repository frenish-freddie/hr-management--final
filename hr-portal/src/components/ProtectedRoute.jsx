import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  // All authenticated users can access all pages
  // Permission restrictions are handled at the action level within each page
  return children;
}
