import express, {Request, Response} from 'express'
import { env } from './config/env.js';
import produtosRouter from './routes/produtosRouter.js';
import moradoresRouter from './routes/moradoresRouter.js'
import logger from './middlewares/logger.js';
import tratadorDeErro from './middlewares/tratadorDeErros.js';
import naoEncontrado from './middlewares/naoEncrontado.js';
import validarJson from './middlewares/validarJson.js';
import logararErros from './middlewares/logarErros.js';

const server = express();
server.use(express.json());

server.use(logger);

server.get('/', (req: Request, res:Response) => {
    res.status(200).json({data : {projeto: 'CondoShop', versao: '1.0'}});
});

server.get('/status', (req: Request, res: Response) => {
    res.status(200).json({status: 'online'})
});

server.use(validarJson);

server.use('/moradores', moradoresRouter);
server.use('/produtos', produtosRouter);

server.use(naoEncontrado);
server.use(logararErros)
server.use(tratadorDeErro);

server.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} rodando na porta ${env.PORT}`)
});