import { Request, Response, NextFunction } from "express";

function logararErros(err:Error, req:Request, res:Response, next:NextFunction): void {
    console.log(`[ERRO] ${req.method} ${req.url} - ${err.message}`)
    next(err);
}

export default logararErros