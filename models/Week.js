const mongoose = require('mongoose');

const WeekModel = mongoose.Schema({
    theme1:{
        type:Object,
        default:{idT:null,votes:0}
    },
    theme2:{
        type:Object,
        default:{idT:null,votes:0}
    },
    theme3:{
        type:Object,
        default:{idT:null,votes:0}
    },
    timestamp:{
        type:Number,
        required:true()
    }
})

module.exports = mongoose.model('Weeks', WeekModel)