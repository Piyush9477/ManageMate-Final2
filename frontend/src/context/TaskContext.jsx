import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [projectName, setProjectName] = useState("");
    const taskAPI = "http://localhost:5001/tasks";

    //Fetch team members from backend
    const fetchMembers = async () => {
        try{
            const response = await fetch(`${taskAPI}/members`, {
                method: "GET",
                credentials: "include"
            });

            if(!response.ok){
                throw new Error("Failed to fetch members");
            }

            const data = await response.json();
            setMembers(data);
        }
        catch (error) {
            console.error("Error fetching members:", error.message);
        }
    }

    //Fetch tasks from backend
    const fetchTasks = async (projectId) => {
        try{
            let url = `${taskAPI}/`;
            if (projectId) {
                url += `?projectId=${projectId}`;
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: "include" 
            });

            if(!response.ok){
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();
            setTasks(data);
        }
        catch (error) {
            console.error("Error fetching tasks:", error.message);
        }
    }

    const fetchProjectName = async (projectId) => {
        try{
            let url = `${taskAPI}/projectName/`;
            if (projectId) {
                url += `?projectId=${projectId}`;
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: "include" 
            });

            if(!response.ok){
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();
            setProjectName(data);
        }
        catch (error) {
            console.error("Error project name:", error.message);
        }
    }

    const createTask = async (taskData) => {
        try{
            const response = await fetch(`${taskAPI}/createTask`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(taskData)
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Task creation failed");
            }

            const newTask = await response.json();
            setTasks((prevTasks) => [...prevTasks, newTask.task]);

            return true;
        }
        catch (error) {
            console.error("Error creating task:", error.message);
            return false;
        }
    }

    const updateTask = async (taskId, progress) => {
        try{
            const response = await fetch(`${taskAPI}/updateTask/${taskId}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({progress})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update task progress");
            }

            const updatedResponse = await response.json();
            const updatedTask = updatedResponse.task;

            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
            );

            return true;
        }
        catch (error) {
            console.error("Error updating task progress:", error.message);
            return false;
        }
    }

    useEffect(() => {
        fetchMembers();
        fetchTasks();
    }, []);

    return(
        <TaskContext.Provider value={{members, tasks, projectName, fetchTasks, createTask, fetchProjectName, updateTask}}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTask = () => useContext(TaskContext);