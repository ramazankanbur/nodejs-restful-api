const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); //get post requestlerinin üzerinde ki bilgileri okuyabilmek için
const logger = require('morgan'); //log yapısı için kullanılan paket  
const projectConfig = require('./config/projectConfig'); //proje için gereken global değişkenler
const mainRouter = require('./route/mainRouter'); //login olmadan kullanılacak url ler (nonapi)
const apiRuter = require('./route/apiRouter'); //api url leri

projectConfig.connectMongoDb();

// app.set('gizlikelime', projectConfig.coreConfig.secretKey);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//authantice olduktan sonra kullanılabilen route
app.use('/api', apiRuter);
//authantice olmadan kullanılabilecek route
app.use('/', mainRouter);

app.use((err, req, res, next) => {
    res.status(res.status).send({ "Hata": err });
});

app.listen(projectConfig.coreConfig.port, () => {
    console.log(`${projectConfig.coreConfig.port} numaralı porttan dinleme başladı.`);
});