var should = require('should'); //ingilizce konuşuyor gibi assert yapmak için kullanışlı bir paket
var mongoose = require('mongoose');
var User = require('../model/user');
var request = require('supertest'); //test ortamında request ihtiyaçları için paket
var mocha = require('mocha');


describe('Api test', () => {
    var apiUrl = 'http://localhost:4000';
    var token = '';
    var app = undefined;
    //Testin her çalıştırılmasında çalışacak kısım
    beforeEach((done) => {
        User.remove({ name: { '$ne': 'TestUser' } }, (err) => {
            if (err) {
                console.error('User collection"ı temizlenirken hata oluştu');
            }
            done();
        });
    });

    describe('User', () => {
        before((done) => {
            app = require('../server.js');
            request(apiUrl)
                .post('/register')
                .send({
                    name: 'TestUser',
                    password: '123456'
                })
                .end((err, res) => {
                    if (err) { throw err; }
                    if (res.body.success) {
                        request(apiUrl)
                            .post('/login')
                            .send({
                                name: 'TestUser',
                                password: '123456'
                            })
                            .end((err, res) => {
                                if (err) { throw err }
                                if (res.body.success) {
                                    token = res.body.token;
                                    done();
                                }
                                else { throw res.body.message; }
                            });
                    }
                    else { throw res.body.message; }
                });
        });
        after((done) => {
            User.remove({ name: 'TestUser' }, function (err) {
                if (err) {
                    console.error('Test kullanıcısı silinirken hata oluştu');
                }
                done();
            });
        });
        it('Boş token hatası vermeli', (done) => {
            request(apiUrl)
                .get('/api/users')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.equal(403);
                    done();
                });
        });
        it('Invalid token hatası vermeli', (done) => {
            request(apiUrl)
                .get('/api/users')
                .set('Authorization', 'uygun olmayan token')
                .end((err, res) => {
                    if (err) throw err;
                    res.status.should.equal(403);
                    done();
                });
        });
        it('Yeni kullanıcı kayıt etmeli', (done) => {
            let user = {
                'name': 'John Doe',
                'password': '123456'
            };

            request(apiUrl).post('/register')
                .send(user)
                .end((err, res) => {
                    if (err) throw err;
                    res.body.success.should.equal(true);
                    done();
                });

        });
        it('Kullanıcıları listelemeli', (done) => {
            let user = {
                'name': 'kullanıcı',
                'password': 'şifre'
            };
            request(apiUrl)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    if (res.body.success)
                        request(apiUrl)
                            .get('/api/users')
                            .set('x-access-token', token)
                            .end((err, res) => {
                                if (err) throw err;
                                res.body.success.should.equal(true);
                                res.body.users.users.should.have.lengthOf(2);
                                done();
                            });
                });
        });
        it('Kullanıcı login olmalı', function (done) {
            let user = {
                "name": "test2",
                "password": "54321"
            };

            request(apiUrl)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    if (err) throw err;

                    request(apiUrl)
                        .post('/login')
                        .send({
                            name: "test2",
                            password: "54321"
                        })
                        .end((err, res) => {
                            if (err) throw err;

                            res.body.success.should.equal(true);
                            res.body.token.should.not.be.empty;
                            done();
                        });
                });
        }); 
    });
});





