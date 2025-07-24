import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [userId] = useState(localStorage.getItem("userId"));
  const [msg, setMsg] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      setMsg("Error loading tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return setMsg("Please enter a task title");
    try {
      const res = await axios.post("http://localhost:5000/api/tasks/add", { title, userId });
      setTasks([res.data.task, ...tasks]);
      setTitle("");
      setMsg("Task added");
    } catch (err) {
      setMsg("Error adding task");
    }
  };

  // Toggle task
  const toggleTask = async (task) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        title: task.title,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data.updatedTask : t)));
    } catch (err) {
      setMsg("Error updating task");
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setMsg("Error deleting task");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-5 rounded">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      {msg && <p className="text-sm text-gray-500 mb-3">{msg}</p>}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center border p-2 rounded">
            <span
              onClick={() => toggleTask(task)}
              className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
