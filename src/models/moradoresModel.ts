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

export default {findAll, findById, create};