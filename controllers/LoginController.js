const bcrypt = require("bcryptjs");
const UsuarioModel = require("../models/Usuario");

exports.criarUsuario = (nome, email, senha) => {
  const senhaCriptografada = bcrypt.hashSync(senha);

  const usuario = UsuarioModel.criarUmUsuario(nome, email, senhaCriptografada);
  
  return usuario;
}

exports.efetuarLogin = (email, senha) => {
  const usuarioLogin = UsuarioModel.procurarEmail(email);

  console.log(usuarioLogin)
  if (!usuarioLogin) {
    throw new Error('Acesso negado, verifique email e senha');
  }

  
  const {senha: senhaCriptografada} = usuarioLogin;

  const senhaValida = bcrypt.compareSync(senha, senhaCriptografada);

  if (!senhaValida) {
    throw new Error('Acesso negado, verifique email e senha');
  }

  return usuarioLogin
}