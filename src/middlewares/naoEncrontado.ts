import { Request, Response } from "express";

function naoEncontrado(req: Request, res:Response): void {
    res.status(404).json({erro: `Rota ${req.method} ${req.url} não encontrada`})
}

export default naoEncontrado