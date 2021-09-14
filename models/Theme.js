const mongoose = require('mongoose');

const ThemeModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model('Themes', ThemeModel)