import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSave, FaEdit, FaTimes, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';


const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/user/profile/${id}`);
      setUser(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to load user profile.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]); 

  
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/user/update/${id}`, user);
      
      alert("User updated successfully!"); 
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Error updating user. Check console for details.");
    }
  };

 
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!user) return <ErrorScreen message="User data is missing." />;


  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-50 transition-all duration-500">
      
      
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">

    
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
            <FaUserCircle className="mr-3 text-blue-500" />
            User Profile
          </h1>
          <div className="flex gap-3">
            {!editMode ? (
              <button
                className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => setEditMode(true)}
              >
                <FaEdit className="mr-2" />
                Edit
              </button>
            ) : (
              <>
                <button
                  className="flex items-center bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-green-300"
                  onClick={handleSave}
                >
                  <FaSave className="mr-2" />
                  Save
                </button>

                <button
                  className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-xl hover:bg-gray-600 transition font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300"
                  onClick={() => setEditMode(false)}
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          

          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">General Information</h2>
            <Field
              label="Username"
              value={user.username}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, username: v })}
              editMode={editMode}
            />

            <Field
              label="Email"
              value={user.email}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, email: v })}
              editMode={editMode}
            />

            <Field
              label="Phone Number"
              value={user.phoneNumber}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, phoneNumber: v })}
              editMode={editMode}
            />

            <Field
              label="Company"
              value={user.company || ""}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, company: v })}
              editMode={editMode}
            />
          </div>


          <div className="p-5 bg-white rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                Location Details
            </h2>

            {/* Address Fields */}
            <div className="mb-6">
                <h3 className="font-bold text-xl mb-3 text-gray-700 border-b pb-1">Address</h3>
                <Field
                    label="Street"
                    value={user.address.street}
                    disabled={!editMode}
                    onChange={(v) => setUser({ ...user, address: { ...user.address, street: v } })}
                    editMode={editMode}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="City"
                        value={user.address.city}
                        disabled={!editMode}
                        onChange={(v) => setUser({ ...user, address: { ...user.address, city: v } })}
                        editMode={editMode}
                    />
                    <Field
                        label="Zip Code"
                        value={user.address.zip}
                        disabled={!editMode}
                        onChange={(v) => setUser({ ...user, address: { ...user.address, zip: v } })}
                        editMode={editMode}
                    />
                </div>
            </div>


            <div>
                <h3 className="font-bold text-xl mb-3 text-gray-700 border-b pb-1">Geo Location</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="Latitude"
                        value={user.address.geo.lat}
                        disabled={!editMode}
                        onChange={(v) =>
                            setUser({ ...user, address: { ...user.address, geo: { ...user.address.geo, lat: v } } })
                        }
                        editMode={editMode}
                    />
                    <Field
                        label="Longitude"
                        value={user.address.geo.lng}
                        disabled={!editMode}
                        onChange={(v) =>
                            setUser({ ...user, address: { ...user.address, geo: { ...user.address.geo, lng: v } } })
                        }
                        editMode={editMode}
                    />
                </div>
            </div>
          </div>

        </div>


        <button
          className="mt-8 w-full flex items-center justify-center bg-gray-800 text-white py-3 rounded-xl hover:bg-black transition font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserProfile;


const Field = ({ label, value, disabled, onChange, editMode }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full p-3 rounded-lg text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2
        ${editMode
          ? "border-blue-400 border-2 bg-white focus:ring-blue-500 shadow-sm"
          : "border border-gray-200 bg-gray-100 cursor-default"
        }
      `}
    />
  </div>
);


const LoadingScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading user data...</p>
        </div>
    </div>
);


const ErrorScreen = ({ message }) => (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border-l-4 border-red-500">
            <p className="text-xl font-bold text-red-600">Oops! An Error Occurred</p>
            <p className="mt-2 text-gray-600">{message}</p>
        </div>
    </div>
);