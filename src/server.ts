import http, { IncomingMessage, ServerResponse }  from 'http';
import { rotasMoradores } from './routes/moradores.js';
import { rotasProdutos } from './routes/produtos.js';
import { respostaErro } from './utils/http.js';
import { env } from './config/env.js';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? 'GET';
    const url = req.url ?? '/';

    console.log(`${req.method} ${req.url}`);

    if(url.startsWith('/produtos')){
        rotasProdutos(req, res, method, url);
    } else if (url.startsWith('/moradores')){
        rotasMoradores(req, res, method, url);
    } else {
        respostaErro(res, 404, "Rota Não encontrada!")
    }
    
    
});

server.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} rodando na porta ${env.PORT}`)
});
