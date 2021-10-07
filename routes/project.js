const express =  require("express");
const router = express.Router();
const Project = require('../models/Project')
const tools =  require("../myModules/myModules")


router.get("/list", async (req,res)=> {
    try {
        const project = await Project.find({},{name:1, description:1,link:1})
        tools.suc(res,"Here is your list",project)
    } catch (e) {
        tools.err(res,e)
    }
})

router.post("/postProject", async (req, res) => {
    try {
        const user = await tools.verifyToken(req.body.token)
        if (user) {
            const project = new Project({
                name:req.body.name,
                link:req.body.link,
                relatedTeam:user.team
            })
            await tools.mySaver(project)
            tools.suc(res, "Project Posted")
        } else {
            tools.suc(res, "Bad token")
        }
    } catch(e) {
        tools.suc(res,e)
    }
})


module.exports = router;