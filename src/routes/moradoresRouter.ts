import { Router } from "express";
import moradoresController from "../controllers/moradoresController.js";

const router = Router();

router.get('/', moradoresController.listar);
router.get('/:id', moradoresController.buscar);
router.post('/', moradoresController.criar);

export default router;