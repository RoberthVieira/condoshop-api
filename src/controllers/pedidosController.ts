import pedidosModel from '../models/pedidosModel.js';
import { pedidosSchema } from '../schemas/pedidosSchema.js';
import { Request, Response } from 'express'

async function criar(req:Request, res:Response): Promise<void> {
    const moradorId = req.morador!.id
    const resultado = pedidosSchema.safeParse(req.body)

    if(!resultado.success){
        res.status(400).json({erro: resultado.error.issues})
        return
    }

    const pedidos = await pedidosModel.criarPedido(moradorId, resultado.data.itens)

    res.status(201).json({pedidos})
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