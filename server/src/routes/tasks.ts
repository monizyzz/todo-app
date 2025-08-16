import { Router } from "express";
import pool from "../db";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use(authenticateToken);

router.get("/", async (req: any, res) => {
  const user_id = req.user.user_id;
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error when searching for tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: any, res) => {
  try {
    const userId = req.user.user_id;
    const { title, description, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, description || "", due_date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Error creating task" });
  }
});

router.put("/:id", async (req: any, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const userId = req.user.user_id;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, completed, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
});

router.delete("/:id", async (req: any, res) => {
  const { id } = req.params;
  const userId = req.user.user_id;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

export default router;
