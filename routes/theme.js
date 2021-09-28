const express =  require("express");    
const router = express.Router();
const Theme = require('../models/Theme')

async function mySaver(s) {
    try {
        const save = await s.save()
        return(save)
    } catch(err) {
        return({message:err})
    }
}

router.get("/list", async (req, res) => {
    try {
        const themes = await Theme.find()
        res.json(themes)
    } catch(e) {
        res.json({message:e})
    }
})

router.post("/newTheme", async (req, res) => {
    const theme = new Theme({
        name:req.body.name,
        desc:req.body.desc ? req.body.desc : ""
    })
    res.json(await mySaver(theme))
});

router.get("/", async (req, res) => {
    try {
        const themes = await Theme.find()
        res.json(themes)
    } catch(err) {
        res.json({message:err})
    }
})

module.exports = router