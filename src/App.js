import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: `Repo novo ${Date.now()}`,
        url: "http://www.repo.com",
        techs: "javascript, react, react native,copernik",
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      });
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const filtered = repositories.filter((repo) => repo.id !== id);
    setRepositories(filtered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
