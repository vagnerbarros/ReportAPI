var repositorio = require("../repositorio/RepositorioUsuario");
var Usuario = require("../schemas/usuario");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var constants = require("../util/constants");
var cadDispositivo = require('../model/cadastroDispositivo');

class CadastroUsuario {

    async logar(email, senha, dispositivo) {
        
        try {
        
            let usuario = await repositorio.usuario.consultarEmailUsuario(email);
            if(usuario){
                let senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
                if(senhaCorreta) {
                
                    let token = jwt.sign({ id: usuario._id }, constants.JWT_SECRET, { expiresIn: constants.EXPIRACAO_TOKEN });
                    let validadeCertificado = await cadEmpresa.empresa.verificarValidadeCertificado(usuario.empresa_padrao);

                    let retornoUsuario = { nome: usuario.nome, foto: usuario.foto, empresas: usuario.empresas, empresa_padrao: usuario.empresa_padrao, validade_certificado: validadeCertificado.validade, sucesso: true, motivo: "", token: token };

                    if(usuario.nivel_acesso === 'ADMINISTRADOR'){
                        return retornoUsuario;
                    }
                    else{

                        let sucesso = false;
            
                        //além de verificar o e-mail e senha, deve verificar também se o dispositivo utilizado é permitido.
                        let dispositivos = await cadDispositivo.dispositivo.buscarChave(dispositivo);
                        usuario.empresas.forEach(element => {
                            dispositivos.forEach(disp => {
                                if(disp.empresa.toString() === element.empresa._id.toString()){
                                    sucesso = true;
                                }
                            })
                        });
                        
                        if(sucesso){
                            return retornoUsuario;
                        }
                        else{
                            return { sucesso: false, motivo: 'Dispositivo não autorizado', token: ''};   
                        }
                    }
                } 
                else{
                    return { sucesso: false, motivo: "E-mail/Senha incorretos", token: ""};
                }
            }
            else{
                return { sucesso: false, motivo: "E-mail/Senha incorretos", token: "" };
            }
        } 
        catch (err) {
            return { sucesso: false, motivo: err, token: ""};
        }
    }

    async logarAdmin(email, senha) {
        
        try {
        
            let usuario = await repositorio.usuario.consultarEmailAdmin(email);
            if(usuario){
                let senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
                if(senhaCorreta) {
                
                    let token = jwt.sign({ id: usuario._id }, constants.JWT_SECRET, { expiresIn: constants.EXPIRACAO_TOKEN });
                    let retornoUsuario = { nome: usuario.nome, foto: usuario.foto, nivel_acesso: 'ANRON', sucesso: true, motivo: "", token: token };

                    return retornoUsuario;
                } 
                else{
                    return { sucesso: false, motivo: "E-mail/Senha incorretos", token: ""};
                }
            }
            else{
                return { sucesso: false, motivo: "E-mail/Senha incorretos", token: "" };
            }
        } 
        catch (err) {
            return { sucesso: false, motivo: err, token: ""};
        }
    }

    consultarUsuario(id){

        return repositorio.usuario.consultarIdUsuario(id);
    }

    listar(empresa){

        return repositorio.usuario.buscarUsuariosEmpresa(empresa);
    }
}

var usuario = new CadastroUsuario();

module.exports = {
  usuario
};
