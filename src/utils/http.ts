import { ServerResponse } from "http";
import { ApiResponse, ApiError } from "../types/index.js";

export function responderSucesso<T>(res: ServerResponse, status: number, data: T ): void {
    res.writeHead(status, {'Content-Type': 'application/json'});
    const resposta: ApiResponse<T> = { data };
    res.end(JSON.stringify(resposta));
};

export function respostaErro<T>(res: ServerResponse, status: number, erro: string): void {
    res.writeHead(status, {'Content-Type': 'application/json'});
    const resposta: ApiError = {erro};
    res.end(JSON.stringify(resposta))
}