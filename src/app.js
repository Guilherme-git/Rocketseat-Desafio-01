const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Listar todos repositorios---------
app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

//Cadastrar repositorio------------
app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const likes = 0

  const repositorie = {id: uuid(), title, url, techs, likes}
  repositories.push(repositorie)

  return response.json(repositorie)
});

//Alterar repositorio----------
app.put("/repositories/:id", (request, response) => {
   const {id} = request.params;
   const {title, url, techs} = request.body

   const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

   if(repositorieIndex < 0){
     return response.status(400).json({error: "Projeto não encontrado"})
   }

   const repositorie = {
      id, title, url, techs, likes: repositories[repositorieIndex].likes
   }
   repositories[repositorieIndex] = repositorie
   return response.json(repositorie)
});

//Deletar repositorio---------
app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Projeto não encontrado"})
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

//Aumentar like repositorio-----------
app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);


  if(repositorieIndex < 0){
    return response.status(400).json({error: "Projeto não encontrado"})
  }


  repositories[repositorieIndex].likes += 1;
 
  return response.json(repositories[repositorieIndex])
});

module.exports = app;
