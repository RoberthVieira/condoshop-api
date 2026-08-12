import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { env } from '../config/env.js'
import Stripe from "stripe";
import prisma from "../database/prisma.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!)

async function handleWebhook(req: Request, res:Response) {
    try{
        const evento = stripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'] as string,
            env.STRIPE_WEBHOOK_SECRET !
        )

        if(evento.type === "checkout.session.completed") {
            const sessao = evento.data.object as Stripe.Checkout.Session
            const pedidoId = Number(sessao.metadata?.pedidoId)

            await prisma.pedido.update({
                where: {id: pedidoId},
                data: {status: 'pago'}
            })
        
            const codigoTicket = randomUUID();

            await prisma.ticket.create({
                data: {
                codigo: codigoTicket,
                pedidoId,
                usado: false
            }})
        }
        
        res.status(200).json({ recebido: true })
    } catch {
        res.status(400).json({ erro: 'Assinatura inválida' })
    }
}

export default handleWebhook