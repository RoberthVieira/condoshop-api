import { Request, Response } from "express";
import { CadastrarNovoMoradorBody } from "../types/index.js";

interface MoradorParams {
    id: string
}

function listar(req:Request, res:Response): void {
    res.status(200).json({data: []});
};

function buscar(req:Request<MoradorParams>, res:Response): void {
    const { id } = req.params;
    res.status(200).json({data: { id }});
}

function criar(req:Request<{}, {}, CadastrarNovoMoradorBody>, res:Response): void {
    const {nome, email, senha, condominio_id} = req.body;

    if(!nome || !email || !senha || !condominio_id){
        res.status(400).json({erro: "Os campos nome, email, senha e condominio_id são obrigatórios"});
        return;
    }

    res.status(201).json({data: {nome, email, senha, condominio_id}});
};

export default {listar, buscar, criar};