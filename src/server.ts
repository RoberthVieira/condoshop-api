import http, { IncomingMessage, ServerResponse }  from 'http';
import { RoleUsuario } from './types/index.js';

interface Produto {
    id: number
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoria_id: number
    imagem?: string 
}

interface Morador {
    id: number
    nome: string
    email: string
    senha: string
    condominio_id: number
    role: RoleUsuario
}

interface CadastrarProdutoBody {
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoria_id: number
    imagem?: string 
} 

interface CadastrarNovoMoradorBody {
    nome: string
    email: string
    senha: string
    condominio_id: number
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? 'GET';
    const url = req.url ?? '/';

    console.log(`${req.method} ${req.url}`);

    if(method === 'GET' && url === "/"){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ projeto: 'CondoShop', versao: '1.0' }))
    } else if(method === "GET" && url === "/status"){
        res.writeHead(200, {'Content-Type': "application/json"})
        res.end(JSON.stringify({'status': 'online'}))
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({erro: 'Rota não encontrada'}))
    }
});

server.listen(3000, () => {
    console.log('CondoShop API rodando em http://localhost:3000')
})
