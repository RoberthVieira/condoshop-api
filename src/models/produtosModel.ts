import prisma from "../database/prisma.js";
import { Produto } from "../generated/prisma/client.js";


async function findAll(): Promise<Produto[]> {
    return await prisma.produto.findMany({
        include: {
            condominio: {
                select: {
                    nome: true,
                    codigo: true
                }
            }
        }
    });
};

async function findById(id: number): Promise<Produto | null> {
    return await prisma.produto.findUnique({
        where: { id },
        include: {
            condominio: {
                select: {
                    nome: true,
                    codigo: true
                }
            }
        }
    })
}

async function create(
    nome: string, 
    descricao:string, 
    preco:number, 
    estoque:number, 
    categoriaId:number, 
    imagem?:string,
    condominioId?: number

): Promise<Produto> {
    const novoProduto = await prisma.produto.create({
        data: {
            nome,
            descricao,
            preco,
            estoque,
            categoriaId,
            imagem,
            condominioId: 1
        }
    })
    return novoProduto;
};

async function update(id:number, dados: Partial<Produto>): Promise<Produto> {
    return await prisma.produto.update({
        where: { id },
        data: dados
    })
}

async function remove(id:number): Promise<void> {
    await prisma.produto.delete({
        where: { id }
    })
}

export default {findAll, findById, create, update, remove};