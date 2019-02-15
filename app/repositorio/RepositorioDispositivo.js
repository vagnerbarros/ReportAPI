var mongoose = require('mongoose');
var Dispositivo = require('../schemas/dispositivo');
var constants = require('../util/constants');

class RepositorioDispositivo{

    async cadastrarDispositivo(novoDispositivo){

        try{
            let salvo = await novoDispositivo.save();
            return salvo;
        }
        catch(err){
            throw err;
        }
    }

    async listarDispositivos(empresa){

        try{
            let dispositivos = await Dispositivo.find({empresa: empresa}).exec();
            return dispositivos;
        }
        catch(err){
            throw err;
        }
    }

    async removerDispositivo(id, empresa){

        try{
            let removido = await Dispositivo.findOneAndRemove({_id: id, empresa: empresa}).exec();
            return removido;
        }
        catch(err){
            throw err;
        }
    }

    async atualizarDispositivo(dispositivo, empresa){

        try{
            let atualizado = await Dispositivo.findOneAndUpdate({_id: dispositivo._id, empresa: empresa}, dispositivo, {new : true}).exec(); 
            return atualizado;
        }
        catch(err){
            throw err;
        }
    }

    async buscarIdDispositivo(id, empresa){
        
        return await this.consultarDispositivo({_id: id, empresa: empresa});
    }

    //retorna um array de dispotivos
    async buscarChaveDispositivo(chave){
        
        try{
            let dispositivos = await Dispositivo.find({chave: chave}).exec();
            return dispositivos;
        } 
        catch(err){
            throw err;
        }
    }

    async consultarDispositivo(query){

        try{
            let dispositivo = await Dispositivo.findOne(query).exec();
            return dispositivo;
        } 
        catch(err){
            throw err;
        }
    }
}

var dispositivo = new RepositorioDispositivo();

module.exports = {
    dispositivo
}


