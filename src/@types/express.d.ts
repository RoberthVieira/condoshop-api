declare namespace Express {
    interface Request {
        morador?: {
            id: number,
            role: string
        }
    }
}