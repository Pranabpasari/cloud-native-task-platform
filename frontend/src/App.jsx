import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "";

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      await fetch(`${API_URL}/api/tasks`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          description,
        }),
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      await fetch(`${API_URL}/api/tasks/${task._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status:
            task.status === "Pending"
              ? "Completed"
              : "Pending",
        }),
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">

      <nav className="navbar">
        <h2>TaskPlatform</h2>

        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Tasks</a>
          <a href="#">Projects</a>
          <a href="#">Login</a>
        </div>
      </nav>

      <section className="hero">

        <h1>Cloud-Native Task Management Platform</h1>

        <p>
          Dockerized full-stack DevOps project using
          React, Node.js, MongoDB, Kubernetes,
          Jenkins, Prometheus and Grafana.
        </p>

      </section>

      <section className="task-section">

        <h2>Create Task</h2>

        <div className="task-form">

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={addTask}>
            Add Task
          </button>

        </div>

      </section>

      <section className="features">

        {tasks.map((task) => (
          <div className="card" key={task._id}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span>Status: {task.status}</span>

            <button onClick={() => updateTaskStatus(task)}>
              {task.status === "Pending"
                ? "Mark Complete"
                : "Mark Pending"}
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>

          </div>
        ))}

      </section>

    </div>
  );
}

export default App;