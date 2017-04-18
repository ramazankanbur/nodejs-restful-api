const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();
 

router.use((req, res, next) => {
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        var verifyResult = userController.verifyToken(token);
        if (verifyResult.success) {
            req.decoded = verifyResult.decoded;
            next();
        } else {
            return res.json({ success: false, message: verifyResult.message })
        }
    }
    else {
        return res.status(403).send({ success: false, message: 'token oluşturulmamış' });
    }
});

router.get('/', (req, res) => {
    res.send({ 'message': 'zımba gibi api :)' })
});

router.get('/users', (req, res, next) => {
    console.log(`Token sahibi ${req.decoded.name}`);
    var userPromise = userController.getAllUser().then((users) => {
        if (users.success) {
            res.send(users.users);
        }
        else {
            res.send({ message: users.message });
        }
    });
    console.log('user lar çekildi');
});


module.exports = router;