const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'isim alanı zorunlu alan']
    },
    password: {
        type: String,
        required: [true, 'şifre alanı zorunlu alan']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userImagePath:{
        type:String
    },
    userImage:{
        data:Buffer,
        contentType:String
    },
    isDelete:{
        type:Boolean,
        default:false
    }
});
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;