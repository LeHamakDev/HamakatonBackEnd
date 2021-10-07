const express =  require("express");    
const router = express.Router();
const User = require('../models/User')
const Team = require('../models/Team')
const Theme = require('../models/Theme')
const Week = require('../models/Week')
const Project = require('../models/Project')
const tools = require("../myModules/myModules")

router.post("/dropUsers", async (req, res) => {
    try {
        await User.collection.drop()
        res.json({success:true, message:"Drop done"})
    } catch(e) {
        res.json({success:false, message:"err"})
    }
})

router.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find()
        tools.suc(res, null,users)
    } catch(e) {
        res.json({success:false, message:"err"})
    }
})

router.get("/getTeams", async (req, res) => {
    try {
        const users = await Team.find()
        tools.suc(res, null,users)
    } catch(e) {
        res.json({success:false, message:"err"})
    }
})

module.exports = router;
