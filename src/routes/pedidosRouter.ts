import { Router } from "express";
import pedidosController from "../controllers/pedidosController.js";

const router = Router();

router.get('/morador/:id', pedidosController.listar)
router.post('/', pedidosController.criar)

export default router