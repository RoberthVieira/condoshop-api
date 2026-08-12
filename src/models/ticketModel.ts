import prisma from "../database/prisma.js";

async function criarTicket(pedidoId: number, codigo: string) {
    return await prisma.ticket.create({
        data: {pedidoId, codigo, usado: false}
    })
}