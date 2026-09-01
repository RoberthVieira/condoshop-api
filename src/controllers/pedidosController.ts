import pedidosModel from '../models/pedidosModel.js';
import { pedidosSchema } from '../schemas/pedidosSchema.js';
import { Request, Response } from 'express'
import stripeService from '../service/stripeService.js';
import produtosModel from '../models/produtosModel.js';

async function criar(req:Request, res:Response): Promise<void> {
    const moradorId = req.morador!.id
    const resultado = pedidosSchema.safeParse(req.body)

    if(!resultado.success){
        res.status(400).json({erro: resultado.error.issues})
        return
    }

    for (const item of resultado.data.itens) {
        const produto = await produtosModel.findById(item.produtoId)
        
        if (!produto) {
            res.status(404).json({ erro: `Produto ${item.produtoId} não encontrado` })
            return
        }

        if (produto.estoque < item.quantidade) {
            res.status(400).json({ erro: `Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}` })
            return
        }
    }

    const pedidos = await pedidosModel.criarPedido(moradorId, resultado.data.itens)

    const itensSessao = await Promise.all(
        resultado.data.itens.map(async (item) => {
            const produto = await produtosModel.findById(item.produtoId)
            return {
                nome: produto!.nome,
                preco: produto!.preco,
                quantidade: item.quantidade
            }
        })
    )

    const urlPagamento = await stripeService.criarSessaoDePagamento(pedidos.id, itensSessao)

    res.status(201).json({pedidos, urlPagamento})
}

async function listar(req:Request,  res:Response): Promise<void> {
    const moradorId = Number(req.params.id)

    if(req.morador!.id !== moradorId && req.morador!.role !== 'admin'){
        res.status(403).json({ erro: 'Acesso negado' })
        return
    }

    const pedidos = await pedidosModel.listarPorMorador(moradorId)
    res.status(200).json({pedidos})
}

export default {criar, listar}