const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

require('dotenv').config()

const Artigo = require("./models/artigo"); //Conexão com o bd

let message = "";

app.get("/", async (req, res) => {

  let artigo = await Artigo.findAll()
  res.render("index", {
    artigo, // Objeto do artigo criado 
    message
  }); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/criar", async (req, res) => {
  res.render("criar"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/sobre", (req, res) => {
  res.render("sobre"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/artigo", (req, res) => {
  res.render("artigo"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/artigo/:id", async (req, res) => {
  let artigo = await Artigo.findByPk(req.params.id)
  const id = req.params.id;
  // const form = artigo[id];
  res.render("artigo", { 
    artigo 
  })
})


app.post("/subscription", async (req, res) => {
  const { nome, email, publi, titulo, imagem } = req.body;
  Artigo.create({ nome, email, publi, titulo, imagem });

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
    })
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
      
      // , {
      //   artigo, message: `Parabéns ${nome}, o seu post foi publicado com sucesso!`
      // })
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
      message: "Artigo não encontrado!",
    });
  }

  res.render("editar", {
    artigo, message
  });
});

  // res.render("editar", {
  //   artigo,
  // });


app.post("/editar/:id", async (req, res) => {
  const artigo = await Artigo.findByPk(req.params.id);

  const { nome, email, publi, titulo, imagem } = req.body;

  artigo.nome = nome;
  artigo.email = email;
  artigo.publi = publi;
  artigo.titulo = titulo;
  artigo.imagem = imagem;

  const artigoEditado = await artigo.save()

  res.render("editar", {
    artigo: artigoEditado,
    mensagemSucesso: "Artigo editado com sucesso!",
  });
});

app.get("/deletar/:id", async(req, res) => {
  const artigo = await Artigo.findByPk(req.params.id)

  if(!artigo) {
    res.render("deletar", {
      artigo,
      message: "Artigo não encontrado",
    })
  }

  res.render('deletar', {
    artigo, mensagem
  })
})


app.post("/deletar/:id", async (req, res) => {
  const artigo = await Artigos.findByPk(req.params.id);

  if (!artigo) {
    res.render("deletar", {
      artigo, mensagem: "Artigo não foi encontrado!",
    });
  }

  await Artigos.destroy();

  message = `Artigo ${artigo.titulo} deletado com sucesso!`

  res.redirect("/");
});

// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));