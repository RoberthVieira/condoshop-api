import { Request, Response } from "express";
import { CadastrarNovoMoradorBody, Morador } from "../@types/index.js";
import moradoresModel from "../models/moradoresModel.js";

interface MoradorParams {
    id: string
}

async function listar(req:Request, res:Response): Promise<void> {
    const moradores = await moradoresModel.findAll()
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
    const {nome, email, senha, condominioId, role} = req.body;

    if(!nome || !email || !senha || !condominioId || !role){
        res.status(400).json({erro: "Os campos nome, email, senha, condominio_id e role são obrigatórios"});
        return;
    }

    const novoMorador = await moradoresModel.create(nome, email, senha, condominioId, role)

    res.status(201).json({data: novoMorador });
};

async function atualizar(req:Request<MoradorParams, {}, Partial<Morador>>, res:Response): Promise<void> {
    const { id } = req.params;
    const {nome, email, senha, condominioId, role} = req.body;
    const morador = {
        nome,
        email,
        senha,
        condominioId,
        role
    }

    const moradorAtualizado = await moradoresModel.update(Number(id), morador)

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