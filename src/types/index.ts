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
    categoria_id: number
    imagem?: string 
}

interface Morador {
    id: number
    nome: string
    email: string
    senha: string
    condominio_id: number
    role: RoleUsuario
}

interface CadastrarProdutoBody {
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoria_id: number
    imagem?: string 
} 

interface CadastrarNovoMoradorBody {
    nome: string
    email: string
    senha: string
    condominio_id: number
    role: RoleUsuario
}

export {ApiResponse, ApiError, StatusPedido, RoleUsuario, Produto, Morador, CadastrarProdutoBody, CadastrarNovoMoradorBody};