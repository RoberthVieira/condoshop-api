import { Produto } from "../types/index.js";

const produtos: Produto[] = [
    {id: 1, nome: 'Agua Mineral', descricao: 'Agua Mineral 500ml', preco: 2.40, estoque: 25, categoria_id: 2},
    {id: 2, nome: 'Mini Pizza Congelada', descricao: 'Mini Pizza Sabor Calabresa', preco: 10.00, estoque: 8, categoria_id: 3},
    {id: 3, nome: 'Snaduiche Natural', descricao: 'Sanduiche Natural: Presunto Mussarela, Patê de frango, alface, tomate, hamburger', preco: 8.40, estoque: 15, categoria_id: 4}
];

function findAll(): Produto[] {
    return produtos;
};

function findById(id: number): Produto | undefined {
    return produtos.find(p => p.id === id);
}

function create(nome: string, descricao:string, preco:number, estoque:number, categoria_id:number, imagem?:string ): Produto {
    const novoProduto = {
        id: produtos.length + 1,
        nome,
        descricao,
        preco,
        estoque,
        categoria_id,
        imagem
    };

    produtos.push(novoProduto);
    return novoProduto;
};

function update(id:number, dados: Partial<Produto>): Produto | undefined {
    const produto = findById(id);

    if(!produto) return undefined;

    if(dados.nome) produto.nome = dados.nome;
    if(dados.descricao) produto.descricao = dados.descricao;
    if(dados.preco) produto.preco = dados.preco;
    if(dados.estoque) produto.estoque = dados.estoque;
    if(dados.categoria_id) produto.categoria_id = dados.categoria_id;
    if(dados.imagem) produto.imagem = dados.imagem;

    return produto
}

function remove(id:number): boolean {
    const index = produtos.findIndex(p => p.id === id);

    if(index === -1) return false;
    
    produtos.splice(index, 1)
    return true
}

export default {findAll, findById, create, update, remove};