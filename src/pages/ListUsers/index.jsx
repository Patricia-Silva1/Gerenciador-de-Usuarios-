import { useEffect, useState } from "react";

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsers;
