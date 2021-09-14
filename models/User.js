const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    login:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    pseudo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:null
    },
    team:{
        type:String,
        default:null
    },
    voted:{
        type:Object,
        default:{idS:null, idT:null}
    },
    token:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:null
    }
})

module.exports = mongoose.model('Users', UserModel)