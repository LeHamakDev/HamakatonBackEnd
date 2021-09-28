const express =  require("express");
const router = express.Router();
const Week = require('../models/Week')
const User = require("../models/User")

async function mySaver(s) {
    try {
        const save = await s.save()
        return(save)
    } catch(err) {
        console.log(err)
        return({message:err})
    }
}
router.post("/vote", async (req,res) => {
    try {
        const user = await User.findOne({token:req.body.token})
        if(user) {
            if (user.voted.idS != req.body.weekID) {
                await user.updateOne({voted:{idS:req.body.weekID, idT:req.body.themeID}})
                const week = await Week.findById(req.body.weekID)
                switch (req.body.themeNumber) {
                    case 0:
                        await week.updateOne({theme1:{idT:week.theme1.idT, votes:week.theme1.votes+1}})
                        break;
                    case 1:
                        await week.updateOne({theme2:{idT:week.theme2.idT, votes:week.theme2.votes+1}})
                        break
                    case 2:
                        await week.updateOne({theme3:{idT:week.theme3.idT, votes:week.theme3.votes+1}})
                        break;
                    default:
                        res.json({success:false,message:"err"})
                }
                res.json({success:true, message:"Voted!"})
            } else {
                res.json({success:false, message:"Vous avez deja voté"})
            }
        } else {
            res.json({success:false, message:"Invalid Token"})
        }
    }
    catch(e) {
        res.json({message:e})
    }
})

router.get('/list', async (req, res) => {
    try {
        const weeks = await Week.find()
        res.json(weeks)
    } catch(e) {
        res.json({message:e})
    }
})

router.post('/newWeek', async (req, res) => {
    const week = new Week({
        theme1:{idT:req.body.theme1,votes:0},
        theme2:{idT:req.body.theme2,votes:0},
        theme3:{idT:req.body.theme3,votes:0},
        timestamp:req.body.timestamp
    })
    res.json(await mySaver(week))
});

module.exports = router;