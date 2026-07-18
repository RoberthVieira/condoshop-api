import { Router } from "express";
import produtosController from "../controllers/produtosController.js";

const router = Router();

router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscar);
router.post('/', produtosController.criar);
router.put('/:id', produtosController.atualizar);
router.delete('/:id', produtosController.excluir);

export default router;