import prisma from "../database/prisma.js";

async function findAll(){
    return await  prisma.categoria.findMany()
}

export default {findAll}