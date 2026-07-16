import { Request, Response } from "express";
import { CadastrarProdutoBody, Produto } from "../types/index.js";
import produtosModel from "../models/produtosModel.js";

interface ProdutosParams {
    id: string
}

function listar(req: Request, res:Response): void {
    const produtos = produtosModel.findAll()
    res.status(200).json({data: produtos});
};

function buscar(req:Request<ProdutosParams>, res:Response): void {
    const { id } = req.params;
    const produto = produtosModel.findById(Number(id))

    if(!produto){
        res.status(404).json({erro: 'Produto não encontrado'})
        return
    }

    res.status(200).json({data: produto });
};

function criar(req:Request<{}, {}, CadastrarProdutoBody>, res:Response): void {
    const {nome, descricao, preco, estoque, categoria_id, imagem} = req.body;
    
    if(!nome || !descricao || !preco || !estoque || !categoria_id) {
        res.status(400).json({erro: "Nome, descrição, preço e estoque são obrigatórios"});
        return;
    }

    const novoProduto = produtosModel.create(nome, descricao, preco, estoque, categoria_id, imagem)

    res.status(201).json({data: novoProduto});
};

function atualizar(req:Request<ProdutosParams, {}, Partial<Produto>>, res:Response): void {
    const { id } = req.params
    const {nome, descricao, preco, estoque, categoria_id, imagem} = req.body 
    const produto = {
        nome,
        descricao,
        preco,
        estoque,
        categoria_id,
        imagem
    }
    const produtoAtualizado = produtosModel.update(Number(id), produto);

    if(!produtoAtualizado){
        res.status(404).json({erro: 'Produto não encontrado'});
        return
    };

    res.status(200).json({mensagem: "Produto alterado com sucesso!"})
};

function excluir(req:Request, res:Response): void {
    const { id } = req.params;
    const excluir = produtosModel.remove(Number(id));

    if(!excluir){
        res.status(404).json("Produto não encontrado")
        return
    }

    res.status(200).send()
}

export default {listar, buscar, criar, atualizar, excluir}