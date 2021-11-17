const express = require("express");
const app = express();
const port = 3000; // Const para armanezar a porta do servidor
app.set("view engine", "ejs");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());


const Artigo = require("./models/artigo"); //Conexão com o bd
require('dotenv').config()

let formula = [];

let message = "";

app.get("/", async (req, res) => {
  const artigo = await Artigo.findAll();
  res.render("index", { 
    artigo, 
    message, 
    formula 
  }); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/criar", (req, res) => {
  res.render("criar"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/sobre", (req, res) => {
  res.render("sobre"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/artigo", (req, res) => {
  res.render("artigo"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});
app.get("/login", (req, res) => {
  res.render("login"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});
app.get("/cadastro", (req, res) => {
  res.render("cadastro"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});


app.post("/subscription", (req, res) => {
  const { nome, email, publi, titulo, imagem } = req.body;
  formula.push({ nome, email, publi, titulo, imagem });

  message = `Parabéns ${nome}, o seu post foi publicado com sucesso!`;
  res.redirect("/");
});

// app.get("/artigo/:id", function (req, res) {
//   const id = req.params.id;
//   const form = formula[id];
//   res.render("artigo", { form, formula });
// });

app.get("/artigo/:id", async (req, res) => {
  const artigo = await Artigo.findOne(req.params.id);
  res.render("artigo", {
    texto,
  });
});

// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));