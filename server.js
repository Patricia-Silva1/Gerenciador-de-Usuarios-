import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env

const prisma = new PrismaClient();
const app = express();

// CORS dinâmico via variável de ambiente
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

app.use(express.json());

// 🧭 Rotas da API
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/usuarios', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const novoUsuario = await prisma.user.create({
      data: { name, email, age: Number(age) }
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

// Inicialização do servidor
app.listen(3001, () => {
  console.log('🚀 Servidor rodando na porta 3001');
});
