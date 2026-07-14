import express, {Request, Response} from 'express'
import { env } from './config/env.js';
import produtosRouter from './routes/produtosRouter.js';
import moradoresRouter from './routes/moradoresRouter.js'

const server = express();
server.use(express.json());

server.get('/', (req: Request, res:Response) => {
    res.status(200).json({data : {projeto: 'CondoShop', versao: '1.0'}});
});

server.get('/status', (req: Request, res: Response) => {
    res.status(200).json({status: 'online'})
})

server.use('/moradores', moradoresRouter);

server.use('/produtos', produtosRouter);

server.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} rodando na porta ${env.PORT}`)
});