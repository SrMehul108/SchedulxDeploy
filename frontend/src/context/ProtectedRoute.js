import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/"); // Redirect to login if no token
    } else {
      setIsAuthenticated(true); // Allow rendering the protected component
    }
  }, [navigate]);

  // Only render the element if the user is authenticated
  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
