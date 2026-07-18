import { Request, Response, NextFunction } from "express";

function validarJson(req:Request, res:Response, next:NextFunction): void {
    if(req.method === "POST" || req.method === "PUT"){
        const contenteType = req.headers['content-type']
        if(!contenteType || !contenteType.includes('application/json')){
            res.status(400).json({erro: "Tipo de dados incompativel"})
            return
        }
    }
    next();
};

export default validarJson;