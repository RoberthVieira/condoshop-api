import { Router } from "express";
import autenticar from "../middlewares/autenticar.js";
import apenasAdmin from "../middlewares/apenasAdmin.js";
import authController from "../controllers/authController.js";

const router = Router();

router.post('/registro', autenticar, apenasAdmin, authController.registro)
router.post('/login',autenticar, authController.login)

export default router