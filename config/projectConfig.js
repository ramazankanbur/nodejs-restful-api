let mongoose = require('mongoose');
var projectConfig = {
    coreConfig: {
        'mongoDb': 'mongodb://localhost:27017/meanAppDb',
        'secretKey': 'meanstackapplication',
        'port': process.env.PORT || 4000,
    },
    connectMongoDb: () => {
        mongoose.Promise = global.Promise; 
        mongoose.connect(projectConfig.coreConfig.mongoDb, (err) => {
            if (err) console.error(`database bağlantısı esnasında hata oluştu ${err.message}`);
        }).then(() => {
            console.log(`${projectConfig.coreConfig.mongoDb} adresine mongoDb bağlantısı başarılı`);
        });
    },
    connectMsSqlDb: () => {
    }
}
module.exports = projectConfig;