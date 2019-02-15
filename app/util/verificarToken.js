var jwt = require('jsonwebtoken');
var constants = require('./constants');

function verificarToken(request, response, next){

    let token = request.headers['x-acess-token'];
    if(!token){
        return response.status(403).send({ sucesso : false, motivo: 'Nenhum token informado.'});
    }
    else{
        jwt.verify(token, constants.JWT_SECRET, function(err, decodificado){
            if(err){
                return response.status(500).send({ sucesso: false, motivo: 'Token inválido'});
            }
            else{
                request.idUsuario = decodificado.id;
                next();
            }
        });
    }
}

module.exports = verificarToken;