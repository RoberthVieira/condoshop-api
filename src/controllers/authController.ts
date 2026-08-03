import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import authModel from '../models/authModel.js';
import { Request, Response } from 'express';
import { loginSchema, registroSchema } from '../schemas/authSchema.js';

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

async function login(req: Request, res:Response): Promise<void> {
    const {email, senha} = req.body;

    if(!email || !senha){
        res.status(400).json({err: "Preencha os campos para efetuar o login!"})
        return
    }

    const morador = await authModel.findByEmail(email);
    if(!morador) {
        res.status(401).json({erro: "Email ou senha incorretos"})
        return 
    }

    const senhaCorreta = await bcrypt.compare(senha, morador.senha)
    if(!senhaCorreta){ 
        res.status(401).json({erro: "Email ou senha incorretos"})
        return
    }

    const token = jwt.sign(
        {id: morador.id, role: morador.role},
        process.env.JWT_SECRET!,
        {expiresIn: '7d'}
    )

    res.status(200).json({token, morador: {
        id: morador.id,
        nome: morador.nome,
        email: morador.email,
        condominio: morador.condominioId,
        role: morador.role
    }})
}

export default {registro, login};