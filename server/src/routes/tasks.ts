import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const { user_id } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter tarefas' });
  }
  res.send('Lista de tarefas');
});

router.post('/', async (req, res) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *",
      [user_id, title]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json({ message: "Tarefa removida" });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao apagar tarefa' });
  }
});

export default router;
