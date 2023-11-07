import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Addpatient = ({ isOpen, closePopup, handleAddPatient }) => {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    medicalHistory: "",
  });

  const handleNameChange = (e) => {
    setPatientDetails({ ...patientDetails, name: e.target.value });
  };

  const handleAgeChange = (e) => {
    setPatientDetails({ ...patientDetails, age: e.target.value });
  };

  const handleMedicalHistoryChange = (e) => {
    setPatientDetails({ ...patientDetails, medicalHistory: e.target.value });
  };

  const handleAddPatientClick = () => {
    if (
      !patientDetails.name ||
      !patientDetails.age ||
      !patientDetails.medicalHistory
    ) {
      toast.error("Please fill in all fields.", { id: "toast" });
    } else {
      handleAddPatient(patientDetails);
      setPatientDetails({
        name: "",
        age: "",
        medicalHistory: "",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute h-screen w-screen backdrop-blur-sm bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white shadow p-10 rounded w-2/6">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Patient Details
        </h2>
        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Name:</label>
          <input
            value={patientDetails.name}
            onChange={handleNameChange}
            className="border py-2 mt-1 px-4"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Age:</label>
          <input
            value={patientDetails.age}
            onChange={handleAgeChange}
            className="border py-2 mt-1 px-4"
            type="number"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Medical History:</label>
          <input
            value={patientDetails.medicalHistory}
            onChange={handleMedicalHistoryChange}
            className="border py-2 mt-1 px-4"
            type="text"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddPatientClick}
            className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none mr-5"
          >
            Add
          </button>
          <button
            onClick={closePopup}
            className="px-6 py-2 border border-indigo-500 bg-white rounded text-indigo-500 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addpatient;
