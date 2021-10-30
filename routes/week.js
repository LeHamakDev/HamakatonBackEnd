const express =  require("express");
const router = express.Router();
const Week = require('../models/Week')
const tools = require("../myModules/myModules")



router.post("/vote", async (req,res) => {
    try {
        const user = await tools.verifyToken(req.body.token)
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
                        tools.err(res,"err")
                }
                tools.suc(res,"Voted!")
            } else {
                tools.err(res,"already voted")
            }
        } else {
            tools.err(res,"invalid token")
        }
    }
    catch(e) {
        tools.err(res,e)
    }
})

router.get('/list', async (req, res) => {
    try {
        const weeks = await Week.find()
        tools.suc(res, "Here is your list", weeks)
    } catch(e) {
        tools.err(res,e)
    }
})

router.get("/getLastWeek", async (req, res) => {
    try {
        const week = await Week.find().sort({"timestamp":-1}).limit(1);
        tools.suc(res, "This is the last week", week)
    } catch (e) {
        tools.err(res,e)
    }
})

router.post('/newWeek', async (req, res) => {
    try {
        const week = new Week({
            theme1:{idT:req.body.theme1,votes:0},
            theme2:{idT:req.body.theme2,votes:0},
            theme3:{idT:req.body.theme3,votes:0},
            timestamp:req.body.timestamp
        })
        tools.suc(res, "Week created", await tools.mySaver(week))
    } catch (error) {
        tools.err(res, err)
    }
});

module.exports = router;