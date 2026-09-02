# CondoShop API 🛒

Backend do **CondoShop** — um e-commerce para mercadinhos de condomínio. Projeto desenvolvido como forma de aprendizado de desenvolvimento backend com Node.js, TypeScript e Express.

## 🚀 Tecnologias

- **Node.js** + **TypeScript** — runtime e tipagem estática
- **Express 5** — framework HTTP (com suporte nativo a async/await sem try/catch manual)
- **Prisma** + **PostgreSQL** — ORM e banco de dados relacional
- **JWT** + **bcrypt** — autenticação e hash de senhas
- **Zod** — validação de dados de entrada
- **Stripe** — integração de pagamentos com webhook
- **Cloudinary** — armazenamento de imagens

## 📁 Estrutura do projeto
```
src/
├── config/ # Variáveis de ambiente (env.ts)
├── controllers/ # Lógica de cada rota (recebe req, chama model, devolve res)
├── middlewares/ # Auth, logger, tratador de erros, validação de JSON
├── models/ # Queries ao banco via Prisma
├── routes/ # Definição das rotas Express
├── schemas/ # Schemas de validação Zod
├── service/ # Integrações externas (Stripe)
├── @types/ # Tipos e interfaces TypeScript customizados
└── server.ts # Entry point da aplicação
prisma/
├── schema.prisma # Definição dos models do banco
└── migrations/ # Histórico de migrations
```

## 🗃️ Modelo de dados
```
Condominio
├── Morador (tem pedidos)
└── Produto (tem categoria, itensPedido)
└── Categoria

Pedido
├── ItemPedido (produto + quantidade + preço)
└── Ticket (código UUID gerado após pagamento)
```

## 🔐 Autenticação e Autorização

- Login gera um **JWT** com `id`, `role` e `condominioId` do morador
- Middleware `autenticar` valida o token em todas as rotas protegidas
- Middleware `apenasAdmin` restringe rotas administrativas
- Sistema **multi-tenant**: cada morador só acessa dados do seu condomínio

## 📦 Funcionalidades

### Moradores
- Registro e login com hash bcrypt
- Listagem e busca de produtos com filtro por categoria e paginação
- Criação de pedidos com validação de estoque
- Histórico de pedidos por morador

### Admin
- CRUD completo de produtos com **soft delete**
- Reativação de produtos inativos
- Gestão de moradores (criar, editar, deletar com cascade de pedidos)
- Dashboard com métricas: moradores, produtos, pedidos e total em vendas

### Pagamentos (Stripe)
- Criação de sessão de checkout
- Webhook para confirmação de pagamento
- Geração de ticket UUID após pagamento confirmado
- Baixa automática de estoque após pagamento

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL rodando localmente
- Conta no Stripe (para pagamentos)

### Instalação

```bash
git clone https://github.com/RoberthVieira/condoshop-api
cd condoshop-api
npm install
```

### Variáveis de ambiente

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/condoshop"
JWT_SECRET="seu_secret_aqui"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
FRONTEND_URL="http://localhost:5173"
PORT=3333
APP_NAME="Condoshop-API"
```

### Banco de dados

```bash
npx prisma migrate dev
```

### Rodando

```bash
npm run dev    # desenvolvimento
npm run build  # build
npm start      # produção
```

## 🛣️ Principais rotas

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/registro` | Cadastro de morador | — |
| POST | `/auth/login` | Login | — |
| GET | `/produtos` | Lista produtos (com filtros) | ✅ |
| GET | `/categoria` | Lista categorias | ✅ |
| POST | `/produtos` | Cria produto | Admin |
| PUT | `/produtos/:id` | Atualiza produto | Admin |
| DELETE | `/produtos/:id` | Desativa produto (soft delete) | Admin |
| PATCH | `/produtos/:id` | Reativa produto | Admin |
| POST | `/pedidos` | Cria pedido + sessão Stripe | ✅ |
| GET | `/pedidos/morador/:id` | Histórico de pedidos | ✅ |
| GET | `/dashboard` | Métricas do admin | Admin |
| POST | `/webhook` | Webhook do Stripe | — |

## 💡 Conceitos praticados

- Arquitetura em camadas (routes → controllers → models)
- Middleware pattern no Express
- Autenticação stateless com JWT
- Hash de senhas com bcrypt
- Validação de entrada com Zod
- ORM com Prisma e migrations
- Multi-tenancy por condomínio
- Soft delete vs hard delete
- Foreign key constraints e cascade delete
- Integração com API externa (Stripe)
- Webhook handling
- Tratamento centralizado de erros