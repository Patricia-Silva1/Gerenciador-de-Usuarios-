import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb'; // Para validar o ID do MongoDB

const prisma = new PrismaClient();
const app = express();

// Habilita CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:5177' // Altere se seu frontend estiver em outra porta
}));

app.use(express.json());

// Rota GET - listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários', detalhes: error.message });
  }
});

// Rota POST - criar novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { name, age, email } = req.body;

    if (!name || !age || !email) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const novoUsuario = await prisma.user.create({
      data: { name, age, email }
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
  }
});

// Rota PUT - atualizar usuário existente
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const id = req.params.id;

    const usuarioAtualizado = await prisma.user.update({
      where: { id },
      data: { name, age, email }
    });

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: usuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
  }
});

// Rota DELETE - remover usuário com validação de ObjectId
app.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;

  // Valida se o ID é um ObjectId válido
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const usuario = await prisma.user.findUnique({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await prisma.user.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
  }
});

// Inicialização do servidor
app.listen(3001, () => {
  console.log('🚀 Servidor rodando na porta 3001');
});