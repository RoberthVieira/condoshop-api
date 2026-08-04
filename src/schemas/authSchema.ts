import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
});

export const registroSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
    condominioId: z.number(),
    role: z.enum(['morador', 'admin'])
})

