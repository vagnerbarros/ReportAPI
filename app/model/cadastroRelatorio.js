let ejs = require('ejs');
let path = require('path');
let pdf = require('html-pdf');
let fs = require('fs');

class CadastroRelatorio {

    venda() {  
            
        let venda1 = {
            numero: 1,
            cliente: {
                nome: 'Jose da Silva'
            },
            valor: 124.43
        }

        let vendas = [];
        vendas.push(venda1);

        let dados = {
            titulo: 'Relatorio de Venda', 
            vendas: vendas
        };
        
        ejs.renderFile(path.join(__dirname, '../templates/venda.ejs'), dados, (err, result) => {
            if(!err){
                pdf.create(result, { format : 'Letter'}).toFile('./vendas.pdf', function(err, res) {
                    if (err) return console.log(err);
                    console.log(res); // { filename: '/app/businesscard.pdf' }
                });
            }
            else{
                console.log(err)
            }
        })
    }
}

var relatorio = new CadastroRelatorio();

module.exports = relatorio;