import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { url } from "../config";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/login`, formData);
      let { message, ...user } = response.data;
      setIsAuthenticated(user);
      navigate("/");
      toast.success("Login successful", { id: "toast" });
    } catch (error) {
      console.error("Login failed:", error);
      // Show an error toast
      // toast.error("Login failed", { id: "toast" });
      toast.error("Login failed", { id: "toast" });
    }
  };

  return (
    <div className="h-full flex justify-center items-center bg-indigo-200">
      <form
        className="bg-white rounded border shadow p-6 w-3/4 md:w-2/6"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8 mt-2 font-semibold text-3xl">
          Login
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <NavLink
            to="/register"
            className="text-sm text-gray-400 font-semibold flex h-full"
          >
            Dont have an account?
          </NavLink>
          <button
            type="submit"
            className="bg-indigo-500 text-white text-lg font-bold p-2 px-6 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
