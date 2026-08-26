import { Router } from "express";
import apenasAdmin from "../middlewares/apenasAdmin.js";
import produtosController from "../controllers/produtosController.js";

const router = Router();

router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscar);
router.post('/', apenasAdmin, produtosController.criar);
router.put('/:id', apenasAdmin, produtosController.atualizar);
router.delete('/:id', apenasAdmin, produtosController.excluir);
router.patch('/:id', apenasAdmin, produtosController.ativar);

export default router;