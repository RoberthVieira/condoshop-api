import bcrypt from 'bcrypt';
import authModel from '../models/authModel.js';
import { Request, Response } from 'express';

async function registro(req: Request, res:Response): Promise<void> {
    const {nome, email, senha, condominioId, role} = req.body;

    if(!nome || !email || !senha || !condominioId || !role) {
        res.status(400).json({erro: "Preencha os dados corretamente"})
        return
    }

    const moradorExistente = await authModel.findByEmail(email);
    if(moradorExistente){
        res.status(409).json({erro: "Email ja cadastrado"})
        return        
    };

    const senhaHash = await bcrypt.hash(senha, 10)

    const morador = await authModel.createUser(nome, email, senhaHash, condominioId, role)
    res.status(201).json({ data: { id: morador.id, nome: morador.nome, email: morador.email } })
}

export default {registro};