import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { url } from "../config";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/profile.png";
const ProfilePopup = ({ isOpen, closePopup }) => {
  const [edit, setEdit] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [editedFields, setEditedFields] = useState({});

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick = () => {
    console.log(editedFields);
    const headers = {
      Authorization: `Bearer ${isAuthenticated.token}`,
    };

    axios
      .post(`${url}/api/profile/edit`, editedFields, { headers })
      .then((response) => {
        toast.success("Profile Edited successfully", { id: "toast" });
        setIsAuthenticated({ ...isAuthenticated, ...response.data.data });
        setEdit(false);
        setEditedFields({});
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute h-screen w-screen backdrop-blur-sm bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white shadow p-10 rounded w-2/6">
        <div className="flex justify-between mb-8">
          <h2 className="text-xl font-semibold">Profile Details</h2>
        </div>

        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Name:</label>
          {edit ? (
            <input
              className="border px-4 py-2"
              type="text"
              value={editedFields.name || isAuthenticated.name}
              onChange={(e) =>
                setEditedFields({ ...editedFields, name: e.target.value })
              }
            />
          ) : (
            <p>{isAuthenticated.name}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Email:</label>
          <p>{isAuthenticated.email}</p>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Contact Number:</label>
          {edit ? (
            <input
              className="border px-4 py-2"
              type="text"
              value={
                editedFields.contactInformation ||
                isAuthenticated.contactInformation
              }
              onChange={(e) =>
                setEditedFields({
                  ...editedFields,
                  contactInformation: e.target.value,
                })
              }
            />
          ) : (
            <p>{isAuthenticated.contactInformation}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <label className="font-semibold">Specialty:</label>
          {edit ? (
            <input
              className="border px-4 py-2"
              type="text"
              value={editedFields.specialty || isAuthenticated.specialty}
              onChange={(e) =>
                setEditedFields({ ...editedFields, specialty: e.target.value })
              }
            />
          ) : (
            <p>{isAuthenticated.specialty}</p>
          )}
        </div>
        {edit ? (
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none mr-6 px-6"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className=" py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none mr-6 px-6"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            setEdit(false);
            closePopup();
          }}
          className="px-6 py-2 bg-white text-indigo-500 border border-indigo-500 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProfileClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative">
      <ProfilePopup isOpen={isPopupOpen} closePopup={closePopup} />
      <div className="flex justify-between  items-center px-20 shadow py-5">
        <div className="text-xl font-bold text-indigo-400">Docie</div>
        <div onClick={handleProfileClick} className="cursor-pointer relative">
          <img className="h-8 w-8" src={profile} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
