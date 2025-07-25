import { Router } from 'express';

const router = Router();

// Registo
router.post('/register', (req, res) => {
  res.send('Registo de utilizador');
});

// Login
router.post('/login', (req, res) => {
  res.send('Login de utilizador');
});

export default router;
