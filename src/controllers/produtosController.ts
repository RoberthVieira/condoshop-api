import { Request, Response } from "express";
import { CadastrarProdutoBody, Produto } from "../types/index.js";
import produtosModel from "../models/produtosModel.js";

interface ProdutosParams {
    id: string
}

async function listar(req: Request, res:Response): Promise<void> {
    const produtos = await produtosModel.findAll()
    res.status(200).json({data: produtos});
};

async function buscar(req:Request<ProdutosParams>, res:Response): Promise<void> {
    const { id } = req.params;
    const produto = await produtosModel.findById(Number(id))

    if(!produto){
        res.status(404).json({erro: 'Produto não encontrado'})
        return
    }

    res.status(200).json({data: produto });
};

async function criar(req:Request<{}, {}, CadastrarProdutoBody>, res:Response): Promise<void> {
    const {nome, descricao, preco, estoque, categoriaId, imagem} = req.body;
    
    if(!nome || !descricao || !preco || !estoque || !categoriaId) {
        res.status(400).json({erro: "Nome, descrição, preço e estoque são obrigatórios"});
        return;
    }

    const novoProduto = await produtosModel.create(nome, descricao, preco, estoque, categoriaId, imagem)

    res.status(201).json({data: novoProduto});
};

async function atualizar(req:Request<ProdutosParams, {}, Partial<Produto>>, res:Response): Promise<void> {
    const { id } = req.params
    const {nome, descricao, preco, estoque, categoriaId, imagem} = req.body 
    const produto = {
        nome,
        descricao,
        preco,
        estoque,
        categoriaId,
        imagem
    }
    const produtoAtualizado = await produtosModel.update(Number(id), produto);

    if(!produtoAtualizado){
        res.status(404).json({erro: 'Produto não encontrado'});
        return
    };

    res.status(200).json({mensagem: "Produto alterado com sucesso!"})
};

async function excluir(req:Request, res:Response): Promise<void>{
    const { id } = req.params;

    await produtosModel.remove(Number(id));

    res.status(200).send()
}

export default {listar, buscar, criar, atualizar, excluir}