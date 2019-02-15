var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  nome: String,
  email: String,
  nivel_acesso: String,
  foto: String,
  empresas: [{ empresa: { type: Schema.Types.ObjectId, ref: "empresa" }, nivel_acesso: String }],
  empresa_padrao: { type: Schema.Types.ObjectId, ref: "empresa" },
  responsavel: { type: Schema.Types.ObjectId, ref: "usuario" },
  senha: String
});

var Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;
