// import { useAuth } from "../context/AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ClipboardList, Briefcase, CheckCircle, Hourglass  } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";


// const Dashboard = () => {
//   const { profile, fetchProfile } = useAuth();
//   const { darkMode } = useTheme();
//   const { user } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({ projects: 0, tasks: 0, pending: 0 });
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   fetchProfile();  // ✅ Ensure data is fetched when component mounts
//   // }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/dashboard/stats", {
//           method: "GET",
//           credentials: "include",
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         if (!response.ok) throw new Error("Failed to fetch stats");
//         const data = await response.json();
//         setStats(data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const roleBasedStats = {
//     Manager: [
//       { label: "Total Projects", value: stats.totalProjects, icon: <Briefcase size={28} />, link: "/projects" },
//       { label: "Total Tasks", value: stats.totalTasks, icon: <ClipboardList size={28} />, link: "/tasks" },
//     ],
//     "Project Leader": [
//       { label: "Assigned Projects", value: stats.assignedProjects, icon: <Briefcase size={28} />, link: "/projects" },
//       // { label: "Assigned Tasks", value: stats.assignedTasks, icon: <ClipboardList size={28} />, link: "/tasks" },
//       // { label: "Total Projects", value: stats.totalProjects, icon: <Briefcase size={28} />, link: "/projects" }, 
//       // { label: "Total Tasks", value: stats.totalTasks, icon: <ClipboardList size={28} />, link: "/tasks" },
//     ],
//     "Team Member": [
//       { label: "My Tasks", value: stats.assignedTasks, icon: <ClipboardList size={28} />, link: "/my-tasks" },
//       { label: "Pending Tasks", value: stats.pendingTasks, icon: <Hourglass size={28} />, link: "/pending-tasks" },
//       { label: "Completed Tasks", value: stats.completedTasks, icon: <CheckCircle size={28} />, link: "/completed-tasks" },
//       // { label: "Total Tasks", value: stats.totalTasks, icon: <ClipboardList size={28} />, link: "/tasks" },
//     ],
//   };
  
  
//   return (
//     <div className={`flex flex-col items-center p-8 ml-64 min-h-screen transition-all duration-300 ${
//       darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
//     }`}>
//       {/* <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8 ml-64"> */}
//         {/* {message && (
//           <div className="bg-green-500 text-white p-4 rounded-lg mb-4 shadow-md w-3/4 text-center">
//             {message}
//           </div>
//         )} */}

//         {/* Profile Section in Top Right */}
//         {/* <div className="absolute top-5 right-8 flex items-center space-x-4">
//           <div className="cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-200" onClick={() => navigate("/profile")}>
//             <span className="text-gray-900 font-semibold">{profile?.name}</span>
//           </div>
//         </div> */}

//         <h1 className="text-3xl font-bold mb-4 text-gray-900">
//           Welcome, {user?.name} 
//         </h1>
//         <p className="text-lg mb-4 text-gray-700">Role: {user?.role}</p>
  
//         {/* Role-based Content */}
//         {user?.role === "Manager" && (
//           <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-3/4 text-center">
//             <h2 className="text-xl font-semibold mb-2">Project Management</h2>
//             <p className="text-gray-300">You can add and assign projects.</p>
//           </div>
//         )}
  
//         {user?.role === "Project Leader" && (
//           <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-3/4 text-center">
//             <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
//             <p className="text-gray-300">You can view and manage assigned projects.</p>
//           </div>
//         )}
  
//         {user?.role === "Team Member" && (
//           <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-3/4 text-center">
//             <h2 className="text-xl font-semibold mb-2">Task List</h2>
//             <p className="text-gray-300">You can view and update your tasks.</p>
//           </div>
//         )}
// &nbsp;
// {loading ? (
//         <p>Loading stats...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
//           {roleBasedStats[user?.role]?.map((stat, index) => (
//             <div
//               key={index}
//               className={`cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
//                 darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//               }`}
//               onClick={() => navigate(stat.link)}
//             >
//               <div className="flex items-center space-x-4">
//                 <div className="p-4 bg-blue-500 text-white rounded-full">{stat.icon}</div>
//                 <div>
//                   <p className="text-gray-500 text-sm">{stat.label}</p>
//                   <h2 className="text-2xl font-bold">{stat.value}</h2>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
        
      
//     </div>
//   );
  
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Briefcase, CheckCircle, Hourglass } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    assignedProjects: 0,
    assignedTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Token sent:", token); // Debug log
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:5001/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("Response data:", response.data); // Debug log
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const roleBasedStats = {
    Manager: [
      { label: "Total Projects", value: stats.totalProjects, icon: <Briefcase size={28} />, link: "/projects" },
      { label: "Total Tasks", value: stats.totalTasks, icon: <ClipboardList size={28} />, link: "/tasks" },
    ],
    "Project Leader": [
      { label: "Assigned Projects", value: stats.assignedProjects, icon: <Briefcase size={28} />, link: "/projects" },
    ],
    "Team Member": [
      { label: "My Tasks", value: stats.assignedTasks, icon: <ClipboardList size={28} />, link: "/my-tasks" },
      { label: "Pending Tasks", value: stats.pendingTasks, icon: <Hourglass size={28} />, link: "/pending-tasks" },
      { label: "Completed Tasks", value: stats.completedTasks, icon: <CheckCircle size={28} />, link: "/completed-tasks" },
    ],
  };

  const barData = {
    labels: ['Total Projects', 'Total Tasks', 'Pending Tasks', 'Completed Tasks'],
    datasets: [
      {
        label: 'Tasks & Projects',
        data: [stats.totalProjects, stats.totalTasks, stats.pendingTasks, stats.completedTasks],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0'],
      }
    ]
  };

  const pieData = {
    labels: ['Pending Tasks', 'Completed Tasks'],
    datasets: [
      {
        data: [stats.pendingTasks, stats.completedTasks],
        backgroundColor: ['#ffce56', '#4bc0c0'],
      }
    ]
  };

  return (
    <div className={`flex flex-col items-center p-8 ml-64 min-h-screen transition-all duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Welcome, {user?.name}
      </h1>
      <p className="text-xl mb-4 text-gray-700">Role: {user?.role}</p>

      {user?.role === "Manager" && (
        <div className="bg-blue-800 text-white p-6 rounded-lg shadow-lg w-3/4 text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Project Management</h2>
          <p className="text-gray-300">You can add and assign projects.</p>
        </div>
      )}

      {user?.role === "Project Leader" && (
        <div className="bg-blue-800 text-white p-6 rounded-lg shadow-lg w-3/4 text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-300">You can view and manage assigned projects.</p>
        </div>
      )}

      {user?.role === "Team Member" && (
        <div className="bg-blue-800 text-white p-6 rounded-lg shadow-lg w-3/4 text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Task List</h2>
          <p className="text-gray-300">You can view and update your tasks.</p>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {roleBasedStats[user?.role]?.map((stat, index) => (
            <div
              key={index}
              className={`cursor-pointer p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              onClick={() => navigate(stat.link)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-500 text-white rounded-full">{stat.icon}</div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full mt-8">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Analytical Charts</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h3 className="text-2xl font-semibold mb-4">Tasks & Projects Overview</h3>
            <Bar data={barData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-2xl font-semibold mb-4">Task Distribution</h3>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
