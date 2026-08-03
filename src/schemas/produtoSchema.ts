import { z } from 'zod';

export const produtosSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string(), 
    preco: z.number().positive(), 
    estoque: z.number().positive(), 
    categoriaId: z.number(), 
    imagem: z.string().optional()
})