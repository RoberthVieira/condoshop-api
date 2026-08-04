import { z } from 'zod';

export const moradorSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
    condominioId: z.number(),
    role: z.enum(['morador', 'admin'])
})

export const moradorUpdateSchema = moradorSchema.partial();