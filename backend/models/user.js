const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true 
    } ,
    password : {
        type : String,
        required : true 
    } ,
    name : {
        type : String
    } ,
    is_verified :{
        type : Boolean
    }
} , { timestamps : true })

const User = mongoose.model('User', userSchema )

module.exports = User