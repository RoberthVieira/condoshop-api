interface ApiResponse<T> {
    data: T
};

interface ApiError {
    erro: string
}

type StatusPedido = 'pago' | 'pendente' | 'cancelado'

type RoleUsuario = 'morador' | 'admin'

interface Produto {
    id: number
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoriaId: number
    imagem?: string 
}

interface Morador {
    id: number
    nome: string
    email: string
    senha: string
    condominioId: number
    role: RoleUsuario
}

interface CadastrarProdutoBody {
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoriaId: number
    imagem?: string 
} 

interface CadastrarNovoMoradorBody {
    nome: string
    email: string
    senha: string
    condominioId: number
    role: RoleUsuario
}

interface JwtPayloadCustom {
    id: number,
    role: string
}

interface ItemBody {
    produtoId: number
    quantidade: number
}

interface ItemSessao {
    nome: string,
    preco: number,
    quantidade: number
}

export {ApiResponse, ApiError, StatusPedido, RoleUsuario, Produto, Morador, CadastrarProdutoBody, CadastrarNovoMoradorBody, JwtPayloadCustom, ItemBody, ItemSessao};