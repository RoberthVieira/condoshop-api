import prisma from "../database/prisma.js";
import { Morador } from "../generated/prisma/client.js";
import { RoleUsuario } from "../@types/index.js";

async function findAll(pagina: number, limite: number, condominioId:number): Promise<Morador[]>{
    const skip = (pagina - 1) * limite
    return await prisma.morador.findMany({
        where: {
            condominioId
        },
        take: limite,
        skip: skip,
        orderBy: {nome: 'asc'},
        include:{
            condominio: {
                select: {
                    nome: true,
                    codigo: true
                }
            }
        }
    });
};

async function findById(id: number): Promise<Morador | null> {
    return await prisma.morador.findUnique({
        where: { id }, 
        include:{
            condominio:{
                select:{
                    nome: true,
                    codigo: true
                }
            }
        }
    })
}

async function create(
    nome:string, 
    email:string, 
    senha:string, 
    condominioId:number, 
    role:RoleUsuario): Promise<Morador> {
    const novoMorador = await prisma.morador.create({
        data: {
            nome,
            email,
            senha,
            role,
            condominioId,
        }
    });

    return novoMorador
};

function update(id: number, dados: Partial<Morador>): Promise<Morador> {
    return prisma.morador.update({
        where: { id },
        data: dados
    })
};

async function remove(id: number): Promise<void> {
    await prisma.itemPedido.deleteMany({
        where: {
            pedido: {
                moradorId: id
            }
        }
    })
    await prisma.ticket.deleteMany({
        where: {
            pedido: {
                moradorId: id
            }
        }
    })
    await prisma.pedido.deleteMany({
        where: { moradorId: id }
    })
    await prisma.morador.delete({
        where: { id }
    })
}

export default {findAll, findById, create, update, remove};