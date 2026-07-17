import { Morador, RoleUsuario } from "../types/index.js";

const moradores: Morador[] = [
    {id: 1, nome: "Roberth Vieira Santana", email: "roberthvieirasant@gmail.com", senha: '123456789', condominio_id: 1, role: 'morador'},
    {id: 2, nome: 'Brenda Mundim Felix', email: 'bmundimfelix@gmail.com', senha: '123456789', condominio_id: 1, role: 'morador'}
];

function findAll(): Morador[]{
    return moradores;
};

function findById(id: number): Morador | undefined {
    return moradores.find(m => m.id === id);
}

function create(nome:string, email:string, senha:string, condominio_id:number, role:RoleUsuario): Morador {
    const novoMorador = {
        id: moradores.length + 1,
        nome,
        email,
        senha,
        condominio_id,
        role
    };

    moradores.push(novoMorador);
    return novoMorador
};

function update(id: number, dados: Partial<Morador>): Morador | undefined {
    const morador = findById(id);

    if(!morador) return undefined

    if(dados.nome) morador.nome = dados.nome;
    if(dados.email) morador.email = dados.email;
    if(dados.senha) morador.senha = dados.senha;
    if(dados.condominio_id) morador.condominio_id = dados.condominio_id;
    if(dados.role) morador.role = dados.role

    return morador;
};

function remove(id: number): boolean {
    const index = moradores.findIndex(m => m.id === id);

    if(index === -1) return false

    moradores.splice(index, 1);

    return true
}

export default {findAll, findById, create, update, remove};