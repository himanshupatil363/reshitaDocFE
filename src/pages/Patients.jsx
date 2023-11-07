import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Addpatient from "../components/Addpatient";
import Navbar from "../components/Navbar";
import { url } from "../config";
import deleteIcon from "../assets/bin.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
const Patients = () => {
  const [patients, setPatients] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const fetchPatients = () => {
    const headers = {
      Authorization: `Bearer ${isAuthenticated.token}`,
    };
    axios
      .get(`${url}/api/patients`, { headers })
      .then((response) => {
        setPatients(response.data.patients);
        setIsPopupOpen(false);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleAddPatient = (patientDetails) => {
    const headers = {
      Authorization: `Bearer ${isAuthenticated.token}`,
    };

    axios
      .post(`${url}/api/patient/add`, patientDetails, { headers })
      .then((response) => {
        fetchPatients();
        toast.success("Patient added successfully", { id: "toast" });
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
      });
  };
  const handleDelete = (id) => {
    const headers = {
      Authorization: `Bearer ${isAuthenticated.token}`,
    };
    toast.loading("Removing patient", { id: "toast" });
    axios
      .post(`${url}/api/patient/remove/${id}`, null, { headers })
      .then((response) => {
        fetchPatients();
        toast.success("Patient removed successfully", { id: "toast" });
      })
      .catch((error) => {
        console.error("Error removing patient:", error);
      });
  };

  return (
    <div>
      <Addpatient
        isOpen={isPopupOpen}
        closePopup={closePopup}
        handleAddPatient={handleAddPatient}
      />
      <Navbar />
      <div className="relative overflow-x-auto">
        <div className="flex justify-end">
          <div
            onClick={handlePopupOpen}
            className="bg-indigo-400 text-white px-4 py-3 my-3 mx-10 font-semibold cursor-pointer"
          >
            Add Patient
          </div>
        </div>
        <div className="mx-20">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Medical History
                </th>
                <th scope="col" className="px-6 py-3">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {patients?.map((patient) => (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {patient.name}
                  </th>
                  <td className="px-6 py-3">{patient.age}</td>
                  <td className="px-6 py-3">{patient.medicalHistory}</td>
                  <td
                    onClick={() => handleDelete(patient._id)}
                    className="px-6 py-3"
                  >
                    <img
                      className="h-7 w-7 cursor-pointer"
                      src={deleteIcon}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
