import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../../components/Button";
import TopBackground from "../../components/TopBackground";
import Trash from '../../assets/trash.svg';
import { useNavigate } from "react-router-dom";

import {
  Container,
  ContainerUsers,
  CardUsers,
  TrashIcon,
  Title,
  AvatarUser,
  BackButton
} from './styles';

function ListUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await api.get("/usuarios");
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    getUsers();
  }, []);

  async function deleteUsers(id) {
    try {
       await api.delete(`/usuarios/${id}`);

// Atualiza a lista após deletar
const updatedUsers = usuarios.filter((user) => user.id !== id);
setUsuarios(updatedUsers);


    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  return (
    <Container>
      <TopBackground />
      <Title>Lista de Usuários</Title>

      <ContainerUsers>
        {usuarios.map((user) => (
          <CardUsers key={user.id}>
            <AvatarUser src={`https://avatar.iran.liara.run/public?username=${user.id}`} />
            <div>
              <h3>Nome: {user.name}</h3>
              <p>Idade: {user.age}</p>
              <p>Email: {user.email}</p>
            </div>
            <TrashIcon src={Trash} alt="icone-lixo" onClick={() => deleteUsers(user.id)} />
          </CardUsers>
        ))}
      </ContainerUsers>

      <BackButton onClick={() => navigate('/')}>← Voltar</BackButton>
    </Container>
  );
}

export default ListUsers;
