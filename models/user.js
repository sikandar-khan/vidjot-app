const mongoose = require('mongoose');
const validator = require('validator');

const UserScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength:1,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
const User = mongoose.model('users', UserScema);

module.exports = {
    User
}