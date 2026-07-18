import { Request, Response, NextFunction } from "express";

function logger(req:Request, res:Response, next:NextFunction): void {
    const agora = new Date().toISOString();
    console.log(`[${agora}] ${req.method} ${req.url}`)
    next();
}

export default logger;