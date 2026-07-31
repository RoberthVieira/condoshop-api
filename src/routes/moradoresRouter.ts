import { Router } from "express";
import apenasAdmin from "../middlewares/apenasAdmin.js";
import moradoresController from "../controllers/moradoresController.js";

const router = Router();

router.get('/', moradoresController.listar);
router.get('/:id', moradoresController.buscar);
router.post('/', apenasAdmin, moradoresController.criar);
router.put('/:id', apenasAdmin, moradoresController.atualizar);
router.delete('/:id', apenasAdmin, moradoresController.excluir);

export default router;