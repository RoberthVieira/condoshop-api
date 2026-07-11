import { IncomingMessage, ServerResponse } from "http";
import { responderSucesso } from "../utils/http.js";

export function rotasMoradores(req: IncomingMessage, res: ServerResponse, method: string, url: string): void {
    if(method === "GET" && url === '/moradores') {
        responderSucesso(res, 200, {moradores: []})
    }
}