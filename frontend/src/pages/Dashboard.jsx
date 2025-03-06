import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { profile, fetchProfile } = useAuth();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchProfile();  // ✅ Ensure data is fetched when component mounts
  // }, []);
  
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8 ml-64">
        {/* {message && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-4 shadow-md w-3/4 text-center">
            {message}
          </div>
        )} */}

        {/* Profile Section in Top Right */}
        {/* <div className="absolute top-5 right-8 flex items-center space-x-4">
          <div className="cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-200" onClick={() => navigate("/profile")}>
            <span className="text-gray-900 font-semibold">{profile?.name}</span>
          </div>
        </div> */}

        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Welcome, {user?.name} 
        </h1>
        <p className="text-lg mb-4 text-gray-700">Role: {user?.role}</p>
  
        {/* Role-based Content */}
        {user?.role === "Manager" && (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-3/4 text-center">
            <h2 className="text-xl font-semibold mb-2">Project Management</h2>
            <p className="text-gray-300">You can add and assign projects.</p>
          </div>
        )}
  
        {user?.role === "Project Leader" && (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-3/4 text-center">
            <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
            <p className="text-gray-300">You can view and manage assigned projects.</p>
          </div>
        )}
  
        {user?.role === "Team Member" && (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-3/4 text-center">
            <h2 className="text-xl font-semibold mb-2">Task List</h2>
            <p className="text-gray-300">You can view and update your tasks.</p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;
