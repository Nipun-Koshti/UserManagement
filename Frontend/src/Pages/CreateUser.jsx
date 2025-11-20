import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaArrowLeft, FaSave, FaMapMarkerAlt } from 'react-icons/fa';


const initialUserState = {
  username: "",
  email: "",
  phoneNumber: "",
  company: "",
  address: {
    street: "",
    city: "",
    zip: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
};

const CreateUser = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(initialUserState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleChange = (name, value) => {
    
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts.length === 2) {
        setNewUser(prev => ({
          ...prev,
          [parts[0]]: { ...prev[parts[0]], [parts[1]]: value }
        }));
      } else if (parts.length === 3) {
        setNewUser(prev => ({
          ...prev,
          [parts[0]]: { 
            ...prev[parts[0]], 
            [parts[1]]: { ...prev[parts[0]][parts[1]], [parts[2]]: value }
          }
        }));
      }
    } else {
      
      setNewUser(prev => ({ ...prev, [name]: value }));
    }
  };


  
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
   
    if (!newUser.username || !newUser.email) {
      alert("Username and Email are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/user/create", newUser);
      alert("User created successfully!");
      
      navigate(-1); 
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Error creating user. Please check server logs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-50">
      
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">

        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
            <FaUserPlus className="mr-3 text-green-500" />
            Create New User
          </h1>
        </div>

        <form onSubmit={handleCreate}>
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="p-5 bg-green-50 rounded-2xl border border-green-200">
              <h2 className="text-2xl font-bold mb-4 text-green-700">General Information</h2>
              <Field
                label="Username"
                value={newUser.username}
                onChange={(v) => handleChange('username', v)}
                required
                editMode={true}
              />

              <Field
                label="Email"
                value={newUser.email}
                onChange={(v) => handleChange('email', v)}
                type="email"
                required
                editMode={true}
              />

              <Field
                label="Phone Number"
                value={newUser.phoneNumber}
                onChange={(v) => handleChange('phoneNumber', v)}
                type="tel"
                editMode={true}
              />

              <Field
                label="Company"
                value={newUser.company}
                onChange={(v) => handleChange('company', v)}
                editMode={true}
              />
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  Location Details
              </h2>

              <div className="mb-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-700 border-b pb-1">Address</h3>
                  <Field
                      label="Street"
                      value={newUser.address.street}
                      onChange={(v) => handleChange('address.street', v)}
                      editMode={true}
                  />
                  <div className="grid grid-cols-2 gap-4">
                      <Field
                          label="City"
                          value={newUser.address.city}
                          onChange={(v) => handleChange('address.city', v)}
                          editMode={true}
                      />
                      <Field
                          label="Zip Code"
                          value={newUser.address.zip}
                          onChange={(v) => handleChange('address.zip', v)}
                          editMode={true}
                      />
                  </div>
              </div>

              <div>
                  <h3 className="font-bold text-xl mb-3 text-gray-700 border-b pb-1">Geo Location</h3>
                  <div className="grid grid-cols-2 gap-4">
                      <Field
                          label="Latitude"
                          value={newUser.address.geo.lat}
                          onChange={(v) => handleChange('address.geo.lat', v)}
                          editMode={true}
                      />
                      <Field
                          label="Longitude"
                          value={newUser.address.geo.lng}
                          onChange={(v) => handleChange('address.geo.lng', v)}
                          editMode={true}
                      />
                  </div>
              </div>
            </div>
          </div>


          <div className="flex gap-4 mt-8">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center py-3 rounded-xl transition font-semibold shadow-md focus:outline-none focus:ring-4 
                    ${isSubmitting 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-300'}`
                }
            >
              <FaSave className="mr-2" />
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>

            <button
                type="button"
                className="flex-1 flex items-center justify-center bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;


const Field = ({ label, value, disabled = false, onChange, editMode, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`
        w-full p-3 rounded-lg text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2
        ${editMode
          ? "border-green-400 border-2 bg-white focus:ring-green-500 shadow-sm"
          : "border border-gray-200 bg-gray-100 cursor-default"
        }
      `}
    />
  </div>
);