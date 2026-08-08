import { z } from "zod";

export const pedidosSchema = z.object({
    itens: z.array(
        z.object({
            produtoId: z.number(),
            quantidade: z.number().min(1)
        })
    ).min(1)
})