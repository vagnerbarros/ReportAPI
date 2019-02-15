var cadRelatorio = require('../model/cadastroRelatorio');

class ControllerRelatorio {
    
    venda(request, response) {
        
        cadRelatorio.venda()
    }

    recebimento(request, response) {
        
        
    }
}

var relatorio = new ControllerRelatorio();

module.exports = relatorio;