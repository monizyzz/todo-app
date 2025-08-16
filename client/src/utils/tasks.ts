import api from "./api";

export async function fetchTasks() {
  const response = await api.get("/tasks");
  return response.data;
}
