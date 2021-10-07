const express =  require("express");    
const router = express.Router();
const Theme = require('../models/Theme')

const tools = require("../myModules/myModules")

router.get("/list", async (req, res) => {
    try {
        const themes = await Theme.find()
        tools.suc(res, "Here is your list", themes)
    } catch(e) {
        res.json({message:e})
    }
})

router.post("/newTheme", async (req, res) => {
    try {
        const theme = new Theme({
            name:req.body.name,
            desc:req.body.desc ? req.body.desc : ""
        })
        tools.suc(res, "Theme Created", await tools.mySaver(theme))
    } catch (error) {
        tools.err(res, error)
    }
});


module.exports = router