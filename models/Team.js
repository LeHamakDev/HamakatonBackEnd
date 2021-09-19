const mongoose = require('mongoose');

const TeamModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    teamLeader:{
        type:String,
        required:true
    },
    members:{
        type:Array,
        default:[]
    },
    projectID: {
        type:String,
        default:null
    },
    invitationLink: {
        type:String,
        default:null
    }
})

module.exports = mongoose.model('Teams', TeamModel)