import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { clearToken } from "../utils/auth";
import { fetchTasks } from "../utils/tasks";

type Task = {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  completed?: boolean;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      clearToken();
      navigate("/login");
    }
  };

  const handleTaskCreated = () => {
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Task Form */}
      <div className="mb-6 flex justify-center">
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.due_date}
              completed={task.completed}
              onTaskUpdated={loadTasks}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks yet.</p>
        )}
      </div>
    </div>
  );
}
