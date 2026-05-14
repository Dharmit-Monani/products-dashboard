import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute — wraps any route that requires login
// If loading → show spinner
// If authenticated → show the page
// If not authenticated → redirect to /login

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Still checking auth status (app just loaded)
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loader-text">Checking session...</p>
      </div>
    );
  }

  // Not logged in — redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in — render the protected page
  return children;
};

export default ProtectedRoute;
