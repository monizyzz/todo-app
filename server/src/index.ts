import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import tasksRoutes from './routes/tasks';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

app.get('/ping', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at the port ${PORT}`);
});
