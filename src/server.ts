import http, { IncomingMessage, ServerResponse }  from 'http';

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
