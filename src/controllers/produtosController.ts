import { Request, Response } from "express";
import { CadastrarProdutoBody } from "../types/index.js";

interface ProdutosParams {
    id: string
}

function listar(req: Request, res:Response): void {
    res.status(200).json({data: []});
};

function buscar(req:Request<ProdutosParams>, res:Response): void {
    const { id } = req.params;
    res.status(200).json({data: { id }});
};

function criar(req:Request<{}, {}, CadastrarProdutoBody>, res:Response): void {
    const {nome, descricao, preco, estoque, categoria_id, imagem} = req.body;
    
    if(!nome || !descricao || !preco || !estoque || !categoria_id) {
        res.status(400).json({erro: "Nome, descrição, preço e estoque são obrigatórios"});
        return;
    }

    res.status(201).json({data: {nome, descricao, preco, estoque, categoria_id, imagem}});
};

export default {listar, buscar, criar}