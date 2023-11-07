import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { url } from "../config";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    contactInformation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(`${url}/api/register`, formData);
      toast.success("Registration successful", { id: "toast" });
      navigate("/login")
    } catch (error) {
      console.error("Registration failed:", error);
      // Show an error toast
      toast.error("Registration failed", { id: "toast" });
    }
  };

  return (
    <div className="h-full flex justify-center items-center bg-indigo-200">
      <form
        className="bg-white rounded border shadow p-6 w-3/4 w:3/4 md:w-2/6"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8 mt-2 font-semibold text-3xl">
          Register
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
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
        <div className="mb-4">
          <label className="block text-gray-600">Specialty</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Contact Number</label>
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <NavLink
            to="/login"
            className="text-sm text-gray-400 font-semibold flex h-full"
          >
            Already have an account?
          </NavLink>
          <button
            type="submit"
            className="bg-indigo-500 text-white text-lg font-bold py-2 px-6 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
