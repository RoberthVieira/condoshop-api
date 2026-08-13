import { JwtPayloadCustom } from "../@types/index.js";
import jwt from 'jsonwebtoken';
import { env } from "../config/env.js";
import { Request, Response, NextFunction } from "express";

function autenticar(req: Request, res: Response, next: NextFunction): void {
    const  authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({erro: "Token não fornecido"})
        return
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, env.JWT_SECRET!) as JwtPayloadCustom
        req.morador = {
            id: payload.id, 
            role: payload.role,
            condominioId: payload.condominioId
        }
        next()
    } catch {
        res.status(401).json({ erro: 'Token inválido ou expirado' })
    }
}

export default autenticar