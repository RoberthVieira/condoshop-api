import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client.js";

function tratadorDeErro(err: Error, req:Request, res:Response, next:NextFunction): void {
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P2025'){
            res.status(404).json({erro: 'Registro não encontrado'});
            return
        }

        if(err.code === "P2002"){
            res.status(409).json({erro: 'Campo unico duplicado'})
            return
        }

        if(err.code === "P2003"){
            res.status(409).json({erro: "Chave estrangeira invalida"})
            return
        }
    }

    console.log(err);
    res.status(500).json({erro: "Erro interno de servidor"})
}

export default tratadorDeErro