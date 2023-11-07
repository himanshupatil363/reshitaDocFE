import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Register from "./pages/Register";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <div className="h-full">
      <Toaster />
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Patients />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/" element={<Patients />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
