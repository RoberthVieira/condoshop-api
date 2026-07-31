import {RequestHandler } from "express";

const apenasAdmin: RequestHandler  = (req, res, next) => {
    if(!req.morador || req.morador?.role !==  'admin') {
        res.status(403).json({ erro: 'Apenas Administradores podem acessar' })
        return
    }

    next();
};

export default apenasAdmin;