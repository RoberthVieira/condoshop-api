interface ApiResponse<T> {
    data: T
};

interface ApiError {
    erro: string
}

type StatusPedido = 'pago' | 'pendente' | 'cancelado'

type RoleUsuario = 'morador' | 'admin'

export {ApiResponse, ApiError, StatusPedido, RoleUsuario}