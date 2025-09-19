"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.user_id;
    try {
        const result = yield db_1.default.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC", [user_id]);
        res.json(result.rows);
    }
    catch (err) {
        console.error("Error when searching for tasks:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.user_id;
        const { title, description, due_date } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const result = yield db_1.default.query("INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *", [userId, title, description || "", due_date || null]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Error creating task" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.user.user_id;
    try {
        const result = yield db_1.default.query("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [title, completed, id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: "Error updating task" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.user_id;
    try {
        const result = yield db_1.default.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task removed" });
    }
    catch (err) {
        res.status(500).json({ error: "Error deleting task" });
    }
}));
exports.default = router;
