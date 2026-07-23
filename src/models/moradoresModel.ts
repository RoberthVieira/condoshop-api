import prisma from "../database/prisma.js";
import { Morador } from "../generated/prisma/client.js";
import { RoleUsuario } from "../@types/index.js";

async function findAll(): Promise<Morador[]>{
    return await prisma.morador.findMany();
};

async function findById(id: number): Promise<Morador | null> {
    return await prisma.morador.findUnique({
        where: { id }
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
    await prisma.morador.delete({
        where: { id }
    })
}

export default {findAll, findById, create, update, remove};