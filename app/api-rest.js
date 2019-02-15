const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const constants = require('./util/constants');

app.set('view engine', 'ejs');
app.set('views', 'templates');

app.use(bodyParser.urlencoded({ limit: '50mb', extended : true}));
app.use(bodyParser.json({limit : '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//conexao mongoose
var mongoose = require('mongoose');
mongoose.connect(constants.URL_MONGO, constants.MONGO_OPTIONS);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const routerAutorizacao = require('./routes/autorizacao');
const routerRelatorios = require('./routes/relatorio');

app.use(routerAutorizacao);
app.use(routerRelatorios);


app.listen(3000);