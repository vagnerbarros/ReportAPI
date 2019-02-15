var mongoose = require("mongoose");
var Usuario = require("../schemas/usuario");
var constants = require("../util/constants");

class RepositorioUsuario {
  
    async cadastrarUsuario(novoUsuario) {

        try {

            let salvo = await novoUsuario.save();
            return salvo;
        } 
        catch (err) {
            throw err;
        }
    }

    async atualizarUsuario(usuario){

        try{  

            let atualizado = await Usuario.findOneAndUpdate({_id: usuario._id}, usuario, {new: true}).exec(); 
            return atualizado;
        }
        catch(err){
            throw err;
        }
    }

    async buscarUsuariosEmpresa(empresa){

        try{

            let usuarios = await Usuario.find({'empresas.empresa': empresa}).exec();
            return usuarios;
        }
        catch(err){
            throw err;
        }
    }

    async verificarEmailExistente(email){

        try{

            let usuario = await Usuario.findOne({email: email}).exec();
            return usuario;  
        }
        catch(erro){
            throw err;
        }
    }

    async consultarEmailUsuario(email) {
        
        return await this.consultarUsuario({ email: email });
    }

    async consultarEmailAdmin(email){

        try{

            let usuario = await Usuario.findOne({email: email, nivel_acesso: 'ANRON'}).exec();
            return usuario;  
        }
        catch(erro){
            throw erro;
        }
    }

    async consultarIdUsuario(id){
        
        return await this.consultarUsuario({_id: id});
    }

    async consultarUsuario(query) {
        
        try {
            let usuarios = await Usuario.findOne(query).populate("empresas.empresa", ['fantasia', 'tema', 'logotipo']).exec();
            return usuarios;  
        } 
        catch (err) {
            throw err;
        }
    }
}

var usuario = new RepositorioUsuario();

module.exports = {
  usuario
};
