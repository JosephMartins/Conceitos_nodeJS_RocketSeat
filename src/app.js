const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  result = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;

  return response.json(result);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.json({ error: 'Repository not fount.' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not fount.' })
  }

  repositories.splice(repositoryIndex, 1);
  
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not fount.' })
  }

  /*
  const likes = repositories[repositoryIndex].likes + 1;
  const title = repositories[repositoryIndex].title
  const url = repositories[repositoryIndex].url
  const techs = repositories[repositoryIndex].techs

  const repository = {
    id,
    title,
    url,
    techs,
    likes 
  }
  */ // igual ao codigo abaixo

  const likes = repositories[repositoryIndex].likes +1;
  const repository = {...repositories[repositoryIndex], likes}

  repositories[repositoryIndex]  = repository;

  return response.json(repository);

});

module.exports = app;
