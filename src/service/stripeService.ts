import Stripe from "stripe";
import { ItemSessao } from "../@types/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function criarSessaoDePagamento(pedidoId: number, itens: ItemSessao[]) {
    const line_Items = itens.map(item => ({
        price_data: {
            currency: 'brl',
            product_data: {
                name: item.nome
            },
            unit_amount: Math.round(item.preco * 100)
        },
        quantity: item.quantidade
    }));

    const sessao = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: line_Items,
        success_url: 'http://localhost:5173/sucesso',
        cancel_url: 'http://localhost:5173/cancelado',
        metadata: {pedidoId: String(pedidoId)}
    })

    return sessao.url
}

export default { criarSessaoDePagamento }
