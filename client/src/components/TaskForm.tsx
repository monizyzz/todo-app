import React, { useState } from "react";
import api from "../utils/api";

export default function TaskForm({
  onTaskCreated,
}: {
  onTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title,
        description,
        due_date: dueDate,
      });

      setTitle("");
      setDescription("");
      setDueDate("");

      onTaskCreated();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-lg p-6 border rounded shadow bg-white"
    >
      <input
        type="text"
        placeholder="Task title"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description (optional)"
        className="border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
