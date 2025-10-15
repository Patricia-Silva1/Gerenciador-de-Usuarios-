import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // ← Carrega variáveis do .env

const prisma = new PrismaClient();
const app = express();

// 🔐 CORS dinâmico via variável de ambiente
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

app.use(express.json());

// ... (suas rotas GET, POST, PUT, DELETE continuam iguais)

// Inicialização do servidor
app.listen(3001, () => {
  console.log('🚀 Servidor rodando na porta 3001');
});