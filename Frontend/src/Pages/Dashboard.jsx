import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:4000/api/user/list");
      setUserList(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user list.");
      setLoading(false);
    }
  };

  
  const handelDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/user/delete/${id}`);
      alert("User deleted successfully!");
      
      fetchUser();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user. Check console for details.");
    }
  };

  const handelEdit = (id) => {
    navigate(`/user/${id}`);
  };

  const handelCreate = () => {
    navigate('/create'); 
  };

  
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={fetchUser} />;


  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-50">
      
     
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
            <FaUsers className="mr-3 text-teal-500" />
            User Dashboard
          </h1>
          
          <button
            onClick={handelCreate}
            className="flex items-center bg-teal-600 text-white py-2 px-5 rounded-xl hover:bg-teal-700 transition font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            <FaPlus className="mr-2" />
            Create New User
          </button>
        </div>


        <div className="overflow-x-auto">
          <div className="min-w-full">
            
            <div className="grid grid-cols-5 p-4 bg-gray-100 rounded-t-xl font-bold text-gray-600 border-b border-gray-300">
              <div className="col-span-2">Username</div>
              <div className="col-span-2">Email</div>
              <div className="text-right">Actions</div>
            </div>


            <div className="h-[500px] overflow-y-auto">
              {userList.length === 0 ? (
                <div className="text-center p-10 text-gray-500">No users found. Try creating one!</div>
              ) : (
                userList.map((user) => (
                  <div
                    key={user._id}
                    
                    onClick={() => handelEdit(user._id)} 
                    className="grid grid-cols-5 items-center p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition duration-150"
                  >
                   
                    <div className="col-span-2 font-medium text-gray-800 truncate">{user.username}</div>
                    <div className="col-span-2 text-sm text-gray-600 truncate">{user.email}</div>

                    <div className="flex justify-end gap-3">
                      <button
                        className="p-2 text-blue-500 hover:text-blue-700 rounded-full transition duration-150"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handelEdit(user._id);
                        }}
                        title="Edit/View Profile"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 text-red-500 hover:text-red-700 rounded-full transition duration-150"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handelDelete(user._id);
                        }}
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const LoadingScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading user list...</p>
        </div>
    </div>
);


const ErrorScreen = ({ message, onRetry }) => (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border-l-4 border-red-500">
            <p className="text-xl font-bold text-red-600">Oops! An Error Occurred</p>
            <p className="mt-2 text-gray-600 mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Try Again
                </button>
            )}
        </div>
    </div>
);