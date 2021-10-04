const mongoose = require('mongoose');

const ProjectModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"Default Description"
    },
    link:{
        type:String,
        default:null
    },
    relatedTeam:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Projects', ProjectModel)