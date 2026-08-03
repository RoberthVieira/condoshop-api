import { Request, Response } from "express";
import { CadastrarNovoMoradorBody, Morador } from "../@types/index.js";
import { moradorSchema, moradorUpdateSchema } from "../schemas/moradorSchema.js";
import moradoresModel from "../models/moradoresModel.js";
import { error } from "node:console";

interface MoradorParams {
    id: string
}

async function listar(req:Request, res:Response): Promise<void> {
    const pagina = Number(req.query.pagina) || 1;
    const limite = Number(req.query.limite) || 10;

    const moradores = await moradoresModel.findAll(pagina, limite)
    res.status(200).json({data: moradores});
};

async function buscar(req:Request<MoradorParams>, res:Response): Promise<void> {
    const { id } = req.params;
    const morador = await moradoresModel.findById(Number(id));

    if(!morador){
        res.status(404).json({erro: "Usuario não encontrado"})
        return
    }

    res.status(200).json({data:  morador });
}

async function criar(req:Request<{}, {}, CadastrarNovoMoradorBody>, res:Response): Promise<void> {
   const resultados =  moradorSchema.safeParse(req.body)

    if(!resultados.success){
        res.status(400).json({erro: resultados.error})
        return
    }

    const {nome, email, senha, condominioId, role} = resultados.data
    const novoMorador = await moradoresModel.create(nome, email, senha, condominioId, role)

    res.status(201).json({data: novoMorador });
};

async function atualizar(req:Request, res:Response): Promise<void> {
    const { id } = req.params;
    const resultados = moradorUpdateSchema.safeParse(req.body)

    if(!resultados.success){
        res.status(404).json({erro: resultados.error})
        return
    }

    const moradorAtualizado = await moradoresModel.update(Number(id), resultados.data)

    if(!moradorAtualizado){
        res.status(404).json({erro: "Morador não encontrado"})
        return
    }

    res.status(200).json({mensagem: "Dados alterados com sucesso!"})
}

async function excluir(req:Request, res:Response): Promise<void> {
    const { id } = req.params

    await moradoresModel.remove(Number(id));

    res.status(200).send()
}

export default {listar, buscar, criar, atualizar, excluir};