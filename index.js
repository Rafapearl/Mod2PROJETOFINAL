const express = require("express");
const app = express();
const port = 3000; // Const para armanezar a porta do servidor
app.set("view engine", "ejs");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
let formula = [];

let message = "";



app.get("/", (req, res) => {
    res.render("index", {titulo: 'Catálogo', message, formula}); // Nome do arquivo, o EJS já busca dentro da pasta views.
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
    const { nome, email, publi, titulo } = req.body;
    formula.push({ nome, email, publi, titulo });

    message = `Parabéns ${nome}, o seu post foi publicado com sucesso!`;
    res.redirect("/");
  });
// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));