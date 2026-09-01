import prisma from "../database/prisma.js"

async function getDashboard() {
    const totalMoradores = await prisma.morador.count();
    const totalProdutosCadastrados = await prisma.produto.count();
    const totalProdutosAtivos = await prisma.produto.count({
        where:{
            estoque: {gt: 0},//gt = greater than (maior que)
            ativo: true
        } 
    })
    const totalPedidos = await prisma.pedido.count();

    //Soma todos pedidos que ja foram pagos
    const totalVendas = await prisma.pedido.aggregate({
        _sum: {total: true},
        where: {status: 'pago'}
    });

    //Busca os ultimos 20 pedidos feitos 
    const pedidosRecentes = await prisma.pedido.findMany({
        take: 20,
        orderBy: {createdAt: 'desc'},
        include: {
            morador: {
                select: {nome: true, email: true}
            }
        }
    });

    return {
        totalMoradores,
        totalProdutosCadastrados,
        totalProdutosAtivos,
        totalPedidos,
        totalVendas: totalVendas._sum.total ?? 0,
        pedidosRecentes
    }
}

export default getDashboard;