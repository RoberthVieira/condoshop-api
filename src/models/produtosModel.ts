import prisma from "../database/prisma.js";
import { Produto } from "../generated/prisma/client.js";


async function findAll(busca: string, pagina: number, limite: number, condominioId: number, role: string, apenasInativos: boolean): Promise<Produto[]> {
    const skip = (pagina - 1) * limite;

    const where: any = {
        condominioId,
        nome: {
            contains: busca,
            mode: "insensitive"
        }
    }

    if(role !== 'admin'){
        where.ativo = true
    }

    if(role === 'admin' && apenasInativos === true){
        where.ativo = false
    }

    return await prisma.produto.findMany({
        where,
        take: limite,
        skip: skip,
        orderBy:{nome: "asc"},
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
    condominioId: number, 
    imagem?:string,
): Promise<Produto> {
    const novoProduto = await prisma.produto.create({
        data: {
            nome,
            descricao,
            preco,
            estoque,
            categoriaId,
            imagem,
            condominioId
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
    await prisma.produto.update({
        where: { id },
        data: { ativo: false }
    })
}

async function active(id:number): Promise<void> {
    await prisma.produto.update({
        where: { id },
        data: { ativo: true }
    })
}

export default {findAll, findById, create, update, remove, active};