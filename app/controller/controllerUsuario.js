var cadUsuario = require('../model/cadastroUsuario');

class ControllerUsuario {
        
    login(request, response) {
        
        let json = request.body;

        let email = json['email'];
        let senha = json['senha'];
        let dispositivo = json['dispositivo'];

        cadUsuario.usuario.logar(email, senha, dispositivo)
        .then(usuarioLogado => {
            if (usuarioLogado.sucesso) {
                response.status(200).send(usuarioLogado);
            } else {
                response.status(400).send(usuarioLogado);
            }
        })
        .catch(err => {
            response.status(500).send({ motivo: err });
        });
    }

    loginAdmin(request, response) {
        
        let json = request.body;

        let email = json['email'];
        let senha = json['senha'];

        cadUsuario.usuario.logarAdmin(email, senha)
        .then(usuarioLogado => {
            if (usuarioLogado.sucesso) {
                response.status(200).send(usuarioLogado);
            } else {
                response.status(400).send(usuarioLogado);
            }
        })
        .catch(err => {
            response.status(500).send({ motivo: err });
        });
    }
  }

  var usuario = new ControllerUsuario();

  module.exports = usuario;