# Todo App

A complete task management application with user authentication, built with React + TypeScript on the frontend and Node.js + Express + PostgreSQL on the backend.

## Features

- ✅ **User Authentication** (Register and Login)
- ✅ **Create Tasks** with title, description and due date
- ✅ **List Tasks** for the authenticated user
- ✅ **Mark Tasks as Complete/Incomplete**
- ✅ **Delete Tasks**
- ✅ **Responsive Interface** with Tailwind CSS

## Project Structure

```
todo-app/
├── client/          # Frontend React + TypeScript
├── server/          # Backend Node.js + Express
├── package.json     # Root package.json with unified scripts
└── README.md
```

## Prerequisites

- Node.js (version 16 or higher)
- PostgreSQL
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install:all
```

### 2. Database Setup

Create a PostgreSQL database and run the following SQL:

```sql
CREATE DATABASE todo_app;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE
);
```

### 3. Environment Configuration

Create a `.env` file in the `server/` folder:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## Available Commands

### Development (Development Mode)
```bash
# Run both frontend and backend in development mode
npm run dev
```
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend**: `http://localhost:5000` (Nodemon with hot reload)

### Production Build
```bash
# Build both frontend and backend for production
npm run build
```
- Compiles TypeScript to JavaScript
- Creates optimized production bundles
- Outputs to `client/dist/` and `server/dist/`

### Production Start (Final Version)
```bash
# Run the final production version
npm run start
```
- **Frontend**: `http://localhost:4173` (Vite preview server)
- **Backend**: `http://localhost:5000` (Node.js production server)

### Individual Commands
- `npm run dev:client` - Run only frontend in development
- `npm run dev:server` - Run only backend in development
- `npm run build:client` - Build only frontend
- `npm run build:server` - Build only backend
- `npm run start:client` - Run only frontend in production
- `npm run start:server` - Run only backend in production

## How to Use

1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Use the form to add new tasks
4. **Manage Tasks**:
   - Click "Complete" to mark as done
   - Click "Undo" to unmark
   - Click "Delete" to remove
5. **Logout**: Click the red button to sign out

## Technologies Used

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

## API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Tasks (requires authentication)

- `GET /tasks` - List user's tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Security

- Passwords are hashed with bcrypt
- JWT authentication to protect routes
- Data validation on backend
- Task ownership verification (each user only sees their own tasks)

## Next Improvements

- [ ] Filters by status (complete/pending)
- [ ] Sort by date
- [ ] Categories/tags for tasks
- [ ] Notifications for overdue tasks
- [ ] Interface to edit existing tasks
