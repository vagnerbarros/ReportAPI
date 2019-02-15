var URL_MONGO = '';
var MONGO_OPTIONS = {}

if(process.env.NODE_ENV == 'test'){
    URL_MONGO = 'mongodb://www.anronsoftware.com.br:27017/admin';
    MONGO_OPTIONS = {user: 'anron', pass: '@n40ns', dbName: 'testes', useNewUrlParser: true};
}
else{
    URL_MONGO = 'mongodb://www.anronsoftware.com.br:27017/admin';
    MONGO_OPTIONS = {user: 'anron', pass: '@n40ns', dbName: 'anron', useNewUrlParser: true};
}

const JWT_SECRET = '@N40NSECRET';
const EXPIRACAO_TOKEN = 86400; // EM SEGUNDOS (1 DIA)

module.exports = {
    URL_MONGO,
    MONGO_OPTIONS,
    JWT_SECRET,
    EXPIRACAO_TOKEN
} 