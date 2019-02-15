var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dispositivoSchema = new Schema({
  chave: String,
  nome: String,
  navegador: String,
  versao_navegador: String,
  sistema_operacional: String,
  versao_sistema_operacional: String,
  observacao: String,
  data_geracao: { type: Date, default: Date.now },
  empresa: { type: Schema.Types.ObjectId, ref: "empresa", required: true }
});

var Dispositivo = mongoose.model("dispositivo", dispositivoSchema);

module.exports = Dispositivo;
