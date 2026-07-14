import express, {Request, Response} from 'express'
import { env } from './config/env.js';

const server = express();
server.use(express.json());

server.get('/', (req: Request, res:Response) => {
    res.status(200).json({data : {projeto: 'CondoShop', versao: '1.0'}});
});

server.get('/status', (req: Request, res: Response) => {
    res.status(200).json({status: 'online'})
})

server.get('/moradores', (req: Request, res: Response) => {
    res.status(200).json({data: []});
});

server.get('/produtos', (req: Request, res: Response) => {
    res.status(201).json({data: []})
})

server.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} rodando na porta ${env.PORT}`)
});