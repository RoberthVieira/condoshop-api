import express, {Request, Response} from 'express';
import { env } from './config/env.js';
import cors from 'cors';

//ROTAS
import produtosRouter from './routes/produtosRouter.js';
import moradoresRouter from './routes/moradoresRouter.js';
import authRouter from './routes/auth.js';
import pedidosRouter from './routes/pedidosRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';
import categoriaRrouter from './routes/categoriaRoutes.js'

import handleWebhook from './controllers/webhookController.js';

//MIDDLEWARES
import logger from './middlewares/logger.js';
import tratadorDeErro from './middlewares/tratadorDeErros.js';
import naoEncontrado from './middlewares/naoEncrontado.js';
import validarJson from './middlewares/validarJson.js';
import logararErros from './middlewares/logarErros.js';
import autenticar from './middlewares/autenticar.js';

const server = express();

server.set('etag', false);

server.use(cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

server.post('/webhook', express.raw({type: 'application/json'}), handleWebhook)
server.use(express.json());

server.use(logger);

//ENTRADA NO SISTEMA
server.use('/auth', authRouter)
server.get('/', (req: Request, res:Response) => {
    res.status(200).json({data : {projeto: 'CondoShop', versao: '1.0'}});
});
server.get('/status', (req: Request, res: Response) => {
    res.status(200).json({status: 'online'})
});

server.use(validarJson);

//ACESSO AS PRINCIPAIS ROTAS 
server.use('/moradores', autenticar, moradoresRouter);
server.use('/produtos', autenticar, produtosRouter);
server.use('/categoria', autenticar, categoriaRrouter);
server.use('/pedidos', autenticar, pedidosRouter)
server.use('/dashboard', autenticar, dashboardRouter)

server.use(naoEncontrado);
server.use(logararErros)
server.use(tratadorDeErro);

server.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} rodando na porta ${env.PORT}`)
});