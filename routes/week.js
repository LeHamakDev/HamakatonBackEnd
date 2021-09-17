const express =  require("express");    
const router = express.Router();
const Week = require('../models/Week')

async function mySaver(s) {
    try {
        const save = await s.save()
        return(save)
    } catch(err) {
        console.log("err")
        return({message:err})
    }
}

router.post('/newWeek', async (req, res) => {
    const week = new Week({
        theme1:{idT:req.body.theme1,votes:0},
        theme2:{idT:req.body.theme2,votes:0},
        theme3:{idT:req.body.theme3,votes:0},
    })
    res.json(await mySaver(week))
});

module.exports = router;