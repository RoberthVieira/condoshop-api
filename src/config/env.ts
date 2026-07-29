import dotenv from 'dotenv';

dotenv.config()

if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET é obrigatória — o servidor não pode subir sem ela')
}

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL é obrigatória')
}

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    APP_NAME: process.env.APP_NAME,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
}