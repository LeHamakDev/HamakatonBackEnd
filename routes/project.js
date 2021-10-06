const express =  require("express");
const router = express.Router();
const Project = require('../models/Project')
const User = require("../models/User")
const test =  require("../myModules/myModules.js")

async function verifyToken(token) {
    try {
        const user = await User.findOne({token:token})
        return user
    } catch (error) {
        console.log("error", error)
        return null
    }
}

// async function mySaver(s) {
//     try {
//         const save = await s.save()
//         return(save)
//     } catch(err) {
//         return({message:err})
//     }
// }

router.get("/list", async (req,res)=> {
    try {
        const project = await Project.find({},{name:1, description:1,link:1})
        res.json(project)
    } catch (e) {
        
    }
})

router.post("/postProject", async (req, res) => {
    try {
        const user = await verifyToken(req.body.token)
        if (user) {
            console.log(user)
            const project = new Project({
                name:req.body.name,
                link:req.body.link,
                relatedTeam:user.team
            })
            res.json(await test.mySaver(project))
        } else {
            res.json({success:false, message:"Bad token"})
        }
    } catch(e) {
        res.json({success:false, message:"err"})
    }
})


module.exports = router;