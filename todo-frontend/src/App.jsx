import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="p-4 min-h-screen bg-gray-100">
        {/* Show Logout button only if logged in */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded float-right"
          >
            Logout
          </button>
        )}

        <Routes>
          {/* Redirect root to login or tasks based on login */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />
            }
          />

          {/* Login page */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Tasks page (protected) */}
          <Route
            path="/tasks"
            element={isLoggedIn ? <Tasks /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
