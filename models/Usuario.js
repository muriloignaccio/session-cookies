const { v4: uuid } = require("uuid");
const fs = require("fs");
const usuarios = require("../database/usuarios.json");

exports.criarUmUsuario = (nome, email, senha) => {
  const usuario = {
    id: uuid(),
    nome,
    email,
    senha,
  };

  usuarios.push(usuario);

  fs.writeFileSync("./database/usuarios.json", JSON.stringify(usuarios));

  return usuario;
};

exports.procurarEmail = (email) => {
  const emailEncontrado = (usuarios.find((usuario) => email === usuario.email));
  console.log(email)
  return emailEncontrado;
};
