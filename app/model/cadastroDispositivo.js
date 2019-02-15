var repositorio = require('../repositorio/RepositorioDispositivo');
var Dispostivo = require('../schemas/dispositivo');

class CadastroDispositivo {

    cadastrar(dispositivo, empresa) {

        try{

            dispositivo.empresa = empresa;
            let novoDispositivo = Dispostivo(dispositivo);
    
            return repositorio.dispositivo.cadastrarDispositivo(novoDispositivo);
        }
        catch(erro){
            return {status: 500, motivo: erro.toString()};
        }
    }

    listar(empresa) {
        
        try{

            return repositorio.dispositivo.listarDispositivos(empresa);
        }
        catch(erro){
            return {status: 500, motivo: erro.toString()};
        }
    }

    remover(id, empresa){
        
        try{

            return repositorio.dispositivo.removerDispositivo(id, empresa);
        }
        catch(erro){
            return {status: 500, motivo: erro.toString()};
        }
    }

    buscarChave(chave){
        
        try{

            return repositorio.dispositivo.buscarChaveDispositivo(chave);
        }
        catch(erro){
            return {status: 500, motivo: erro.toString()};
        }
    }

    async atualizar(atual, empresa){

        try{
            
            let dispositivo = await repositorio.dispositivo.buscarIdDispositivo(atual._id, empresa);    
            if(dispositivo){

                return await repositorio.dispositivo.atualizarDispositivo(atual, empresa);
            }
        }
        catch(err){
            return {status: 500, motivo: erro.toString()};
        }
    }
}

var dispositivo = new CadastroDispositivo();

module.exports = {
    dispositivo
}