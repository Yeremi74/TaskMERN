import { createContext, useContext, useState } from 'react';
import {
  createTasksRequest,
  deleteTasksRequest,
  getTasksRequest,
  getUniqueTaskRequest,
  updateTasksRequest,
} from '../api/tasks';

const taskContex = createContext();

export const useTasks = () => {
  const context = useContext(taskContex);

  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTasksRequest(task);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status == 204) getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueTask = async (id) => {
    try {
      const res = await getUniqueTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTasksRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <taskContex.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getUniqueTask,
        updateTask,
      }}
    >
      {children}
    </taskContex.Provider>
  );
}
