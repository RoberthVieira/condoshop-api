import prisma from "../database/prisma.js";
import { Morador } from "../generated/prisma/client.js";
import { RoleUsuario } from "../@types/index.js";

async function findByEmail(email: string): Promise<Morador | null> {
    return await prisma.morador.findUnique({
        where: {email}
    })
};

async function createUser(    
    nome:string, 
    email:string, 
    senhaHash:string, 
    condominioId:number, 
    role:RoleUsuario): Promise<Morador>{

    const novoMorador = await prisma.morador.create({
        data: {
            nome,
            email,
            senha: senhaHash,
            condominioId,
            role
        }
    })

    return novoMorador
}

export default {findByEmail, createUser}