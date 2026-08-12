import prisma from "../database/prisma.js"
import { ItemBody } from "../@types/index.js"

async function criarPedido(moradorId: number, itens:ItemBody[]) {
    return await prisma.$transaction(async (tx) => {
        let total = 0
        const itensComPreco = []

        for(const item  of itens) {
            const produto = await tx.produto.findUnique({
                where: {id: item.produtoId}
            })

            if(!produto) throw new Error(`Produto ${item.produtoId} não encontrado`)

            total += produto.preco * item.quantidade
            itensComPreco.push({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: produto.preco
            })
        }

        const pedido = await tx.pedido.create({
            data: {moradorId, total, status: 'pendente'}
        })

        await tx.itemPedido.createMany({
            data: itensComPreco.map(item => ({
                ...item,
                pedidoId: pedido.id
            }))
        })

        return pedido
    })
}

async function listarPorMorador(moradorId: number) {
    return await prisma.pedido.findMany({
        where: { moradorId },
        include: {
            itens: {
                include: {
                    produto: true
                }
            }
        }
    })
}

async function atualizarStatus(pedidoId: number, status: string) {
    return await prisma.pedido.update({
        where: { id: pedidoId},
        data: { status }
    })
}

export default {criarPedido, listarPorMorador, atualizarStatus}