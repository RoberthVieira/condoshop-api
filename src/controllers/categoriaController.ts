import categoriaModel from "../models/categoriaModel.js";
import { Request, Response } from "express";

async function listar(req:Request, res:Response): Promise<void> {
    const categorias  = await categoriaModel.findAll();

    res.status(200).json({data: categorias})
}

export default {listar}