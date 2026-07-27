import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post('/registro', authController.registro)

export default router