import { Router } from "express";
import { dashboard } from "../controllers/dashboardController.js";
import apenasAdmin from "../middlewares/apenasAdmin.js";

const router = Router();

router.get('/', apenasAdmin, dashboard)

export default router;