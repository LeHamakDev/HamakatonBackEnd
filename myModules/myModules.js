module.exports = {
    mySaver: async function(s) {
        try {
            const save = await s.save()
            return(save)
        } catch(err) {
            return({success:false,message:err})
        }
    },
    verifyToken: async function(token) {
        const User = require("../models/User")
        console.log(token)
        try {
            const user = await User.findOne({token:token})
            return user
        } catch (error) {
            console.log("error", error)
            return null
        }
    },

    mySaver: async function(s) {
        try {
            const save = await s.save()
            return(save)
        } catch(err) {
            return({message:err})
        }
    },

    token:function() {
        return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    },

    badToken: async function(res) {
        res.json({success:false, message:"Bad Token"})
    },

    err: function(res, message) {
        res.json({success:false, message:message})
    },
    suc: function(res, message, data=null) {
        res.json({success:true, message:message, data:data})
    },
  };
  