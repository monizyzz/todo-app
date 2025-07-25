import { Router } from 'express';

const router = Router();

// Obter todas as tarefas
router.get('/', (req, res) => {
  res.send('Lista de tarefas');
});

// Criar uma nova tarefa
router.post('/', (req, res) => {
  res.send('Tarefa criada');
});

export default router;
