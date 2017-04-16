let mongoose = require('mongoose');
let userModel = require('../model/user');

var userManager = {
    getUserByNameAndPassword: (userNameAndPasword) => {
        return userModel.findOne({
            "name": userNameAndPasword.name
        }).then((user) => {
            console.log(user);
            if (!user) { return { success: false, message: 'Böyle bir kullanıcı yok!' }; }
            else if (user) {
                if (user.password != userNameAndPasword.password) { return { success: false, message: 'Şifre hatalı' }; }
                else { return { success: true, message: 'Kullanıcı var', user: user }; }
            }
        });
    },

    getUserById: (userId) => { },

    removeUserById: (userId) => { },
 
    getAllUsers: () => {
        return userModel.find().then((users) => {
            if (users) {
                return { success: true, users: users }
            } else {
                return { success: false, message: "Kullanıcı yoktur." }
            }
        });
    },
    addUser: (user) => {
        return userModel.create(user).then((user) => {
            if (user) {
                return { success: true, user: user }
            } else {
                return { success: false, message: "Kullanıcı eklenmesi esnasında bir hata oluştu." }
            }
        });
    },
    updateUser: (id, user) => { }
}
module.exports = userManager;
