import { Router } from "express";
import { register, testUser, login } from "../controllers/user.js";

const router = Router();

// Definir rutas de user
router.get('/test-user', testUser);
router.post('/register', register);
router.post('/login', login);

// Exportación del router
export default router;