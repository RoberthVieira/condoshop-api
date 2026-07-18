import { Request, Response } from "express";
import { CadastrarNovoMoradorBody, Morador } from "../types/index.js";
import moradoresModel from "../models/moradoresModel.js";

interface MoradorParams {
    id: string
}

function listar(req:Request, res:Response): void {
    const moradores = moradoresModel.findAll()
    res.status(200).json({data: moradores});
};

function buscar(req:Request<MoradorParams>, res:Response): void {
    const { id } = req.params;
    const morador = moradoresModel.findById(Number(id));

    if(!morador){
        res.status(404).json({erro: "Usuario não encontrado"})
        return
    }

    res.status(200).json({data:  morador });
}

function criar(req:Request<{}, {}, CadastrarNovoMoradorBody>, res:Response): void {
    const {nome, email, senha, condominio_id, role} = req.body;

    if(!nome || !email || !senha || !condominio_id || !role){
        res.status(400).json({erro: "Os campos nome, email, senha, condominio_id e role são obrigatórios"});
        return;
    }

    const novoMorador = moradoresModel.create(nome, email, senha, condominio_id, role)

    res.status(201).json({data: novoMorador });
};

function atualizar(req:Request<MoradorParams, {}, Partial<Morador>>, res:Response): void {
    const { id } = req.params;
    const {nome, email, senha, condominio_id, role} = req.body;
    const morador = {
        nome,
        email,
        senha,
        condominio_id,
        role
    }

    const moradorAtualizado = moradoresModel.update(Number(id), morador)

    if(!moradorAtualizado){
        res.status(404).json({erro: "Morador não encontrado"})
        return
    }

    res.status(200).json({mensagem: "Dados alterados com sucesso!"})
}

function excluir(req:Request, res:Response): void {
    const { id } = req.params

    const excluir = moradoresModel.remove(Number(id));

    if(!excluir){
        res.status(404).json({erro: "id do moraador não encontrado"})
        return
    }

    res.status(200).send()
}
export default {listar, buscar, criar, atualizar, excluir};