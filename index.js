require('dotenv').config()

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());

const Artigo = require("./models/artigo"); 

let message = "";

app.get("/", async (req, res) => {

  let artigo = await Artigo.findAll()
  res.render("index", {
    artigo, 
    message
  }); 
});

app.get("/criar", async (req, res) => {
  res.render("criar"); 
});

app.get("/sobre", (req, res) => {
  res.render("sobre");
});

app.get("/artigo", (req, res) => {
  res.render("artigo"); 
});

app.get("/artigo/:id", async (req, res) => {
  let artigo = await Artigo.findByPk(req.params.id)
  const id = req.params.id;
 
  res.render("artigo", { 
    artigo 
  })
})


app.post("/subscription", async (req, res) => {
  const { nome, email, publi, titulo, imagem } = req.body;
  
  if (!nome) {
    res.render("criar", {
      message: "Nome é obrigatório",
    });
  }

  else if (!email) {
    res.render("criar", {
      message: "Email é obrigatório",
    });
  }

  else if (!publi) {
    res.render("criar", {
      message: "Escreva seu artigo",
    });
  }

  else if (!titulo) {
    res.render("criar", {
      message: "Dê um título ao seu artigo"
    });
  }

  else {
    try {
      let artigo = await Artigo.create({
        nome, 
        email, 
        publi, 
        titulo, 
        imagem
      })

      message = `Parabéns ${nome}, o seu post foi publicado com sucesso!`
      res.redirect("/")
  
    } catch (err) {
      console.log(err)

      res.render("criar", {
        message: "Ocorreu um erro ao tentar postar seu artigo, tente novamente"
      })
    }
  }

});

app.get("/editar/:id", async (req, res) => {

  const artigo = await Artigo.findByPk(req.params.id);

  if (!artigo) {
    res.render("editar", {
      message: "Informação não encontrada!",
    });
  }

  res.render("editar", {
    artigo
    });
  });


  app.post("/editar/:id", async (req, res) => {

    const artigo = await Artigo.findByPk(req.params.id);
  
    const { nome, email, publi, titulo, imagem } = req.body;
  
    artigo.nome = nome;
    artigo.email = email;
    artigo.publi = publi;
    artigo.titulo = titulo; 
    artigo.imagem = imagem;
  
    const artigoEditado = await artigo.save();
  
    res.redirect("/")
  });

app.get("/deletar/:id", async(req, res) => {
  const artigo = await Artigo.findByPk(req.params.id)

  if(!artigo) {
    res.render("deletar", {
      message: "Artigo não encontrado",
    })
  }

  res.render('deletar', {
    artigo,  message
  })
})


app.post("/deletar/:id", async (req, res) => {

  const artigo = await Artigo.findByPk(req.params.id);

  if (!artigo) {
    res.render("deletar", {
      message: "Artigo não foi encontrado!",
    });
  }

  await artigo.destroy();

  res.redirect("/");
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));