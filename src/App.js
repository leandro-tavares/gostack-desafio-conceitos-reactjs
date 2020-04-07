import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const title = `Novo repositório ${Date.now()}`;
    const url = 'https://github.com/leandro-tavares/gostack-desafio-conceitos-reactjs';
    const techs = ['Node.js', 'React.js'];

    const response = await api.post('repositories', { title, url, techs });
    const repository = response.data;
    setRepositories([...repositories, repository]);
    console.log(repository);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id);
    const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

    setRepositories(repositories.filter((repo, i) => repositoryIndex !== i));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li
            key={repo.id}
            style={{ width: '400px', padding: 10, margin: 10, border: '1px solid #999', borderRadius: 8 }}
          >
            <div style={{ width: '250px' }}>
              <div>{repo.title}</div>
              <div style={{ fontSize: 12, marginTop: 2 }}>{repo.id}</div>
            </div>
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
