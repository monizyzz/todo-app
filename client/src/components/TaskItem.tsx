import React from "react";
import api from "../utils/api";

type TaskItemProps = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
  onTaskUpdated: () => void;
};

export default function TaskItem({
  id,
  title,
  description,
  dueDate,
  completed = false,
  onTaskUpdated,
}: TaskItemProps) {
  const handleToggleComplete = async () => {
    try {
      await api.put(`/tasks/${id}`, {
        title,
        completed: !completed,
      });
      onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        onTaskUpdated();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  return (
    <div
      className={`border p-4 rounded shadow-sm flex justify-between items-start gap-4 ${
        completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${completed ? "line-through text-gray-600" : ""}`}>
          {title}
        </h3>
        {description && <p className="text-sm text-gray-700">{description}</p>}
        {dueDate && (
          <p className="text-xs text-gray-500">
            Due: {new Date(dueDate).toLocaleDateString()}
          </p>
        )}
        <span
          className={`text-xs font-bold ${
            completed ? "text-green-600" : "text-red-500"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleToggleComplete}
          className={`px-3 py-1 rounded text-sm font-medium ${
            completed
              ? "bg-gray-500 text-white hover:bg-gray-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 rounded text-sm font-medium bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
