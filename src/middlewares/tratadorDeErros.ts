import { Request, Response, NextFunction } from "express";

function tratadorDeErro(err: Error, req:Request, res:Response, next:NextFunction): void {
    console.log(`[ERRO] ${err.message}`)
    res.status(500).json({erro: 'Erro interno do servidor'})
}

export default tratadorDeErro