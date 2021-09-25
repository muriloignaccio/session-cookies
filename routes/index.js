const express = require("express");
const LoginController = require("../controllers/LoginController");
const FeedController = require("../controllers/FeedController");
const verificarUsuarioLogado = require("../middlewares/verificarUsuarioLogado");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let usuario;
  let tema = req.cookies.tema ? req.cookies.tema : "light-mode";

  if (req.session.usuario) {
    usuario = req.session.usuario;
  }

  res.render("index", { title: "Página Inicial", usuario, tema });
});

router.get('/feed', verificarUsuarioLogado, async function(req, res, next) {
  const { data: posts } = await FeedController.getAllPosts();

  res.render('feed', { 
    usuario: req.session.usuario, 
    title: 'Feed', 
    posts: posts.slice(0, 10) 
  });
});

router.get('/posts/:id/comentarios', verificarUsuarioLogado, async function(req, res, next) {
  const { id } = req.params;
  const { data: comentarios } = await FeedController.getAllComments(id);

  res.render('comentarios', { 
    usuario: req.session.usuario, 
    title: 'Comentários', 
    comentarios 
  });
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastro'});
});

router.post("/cadastro", async function (req, res, next) {
  const { nome, email, senha, tema } = req.body;

  const { senha: senhaNaoUsada, ...usuario } = await LoginController.criarUsuario({
    nome,
    email,
    senha
  }).then(user => user.dataValues);

  // const { senha: senhaNaoUsada, ...usuario } = usuarioCriado;

  req.session.usuario = usuario;

  res.cookie("tema", tema);

  res.redirect("/feed");
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/login", async function (req, res, next) {
  const { email, senha } = req.body;

  const { senha: senhaNaoUsada, ...usuario } = await LoginController.logarUsuario({
    email,
    senha,
  });

  req.session.usuario = usuario;

  res.redirect("/feed");
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
