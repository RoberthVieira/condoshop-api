import { Request, Response } from "express";
import { CadastrarProdutoBody, Produto } from "../@types/index.js";
import { produtosSchema, produtoUpdateSchema } from "../schemas/produtoSchema.js";
import produtosModel from "../models/produtosModel.js";

interface ProdutosParams {
    id: string
}

async function listar(req: Request, res:Response): Promise<void> {
    const pagina =  Number(req.query.pagina) || 1
    const limite = Number(req.query.limite) || 10
    const busca = req.query.busca as string || ''

    const produtos = await produtosModel.findAll(busca, pagina, limite, req.morador!.condominioId)
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
    const resultado = produtosSchema.safeParse(req.body)

    if(!resultado.success){
        res.status(400).json({erro: resultado.error.issues })
        return
    }
    
    const { nome, descricao, preco, estoque, categoriaId, imagem } = resultado.data
    const novoProduto = await produtosModel.create(nome, descricao, preco, estoque, categoriaId, req.morador!.condominioId, imagem)

    res.status(201).json({data: novoProduto});
};

async function atualizar(req:Request, res:Response): Promise<void> {
    const { id } = req.params
    const resultados = produtoUpdateSchema.safeParse(req.body) 

    if(!id || !resultados.success){
        res.status(400).json({erro: resultados.error?.issues});
        return
    };

    await produtosModel.update(Number(id), resultados.data)

    res.status(200).json({mensagem: "Produto alterado com sucesso!"})
};

async function excluir(req:Request, res:Response): Promise<void>{
    const { id } = req.params;

    await produtosModel.remove(Number(id));

    res.status(200).send()
}

export default {listar, buscar, criar, atualizar, excluir}