import { IncomingMessage, ServerResponse } from "http";
import { responderSucesso } from "../utils/http.js";

export function rotasProdutos(req: IncomingMessage, res: ServerResponse, method: string, url: string): void {
    if(method === "GET" && url === "/produtos"){
        responderSucesso(res, 200, {produtos: []});
    }
}