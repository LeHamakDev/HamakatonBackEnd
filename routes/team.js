const express =  require("express");
const router = express.Router();
const Team = require('../models/Team')
const User = require("../models/User")

async function mySaver(s) {
    try {
        const save = await s.save()
        return(save)
    } catch(err) {
        return({message:err})
    }
}

var rand = function() {
    return Math.random().toString(36).substr(2);
};
var token = function() {
    return rand() + rand();
};

router.post('/join', async (req,res) => {
    const team = await Team.findOne({invitationLink:req.body.token})
    if(!team) {
        res.json({succes:false,message:"Invalid Token"})
    } else {
        if (team.members.includes(req.body.id)) {
            res.json({succes:true,message:"Deja enregistré"})
        } else {
            team.members.push(req.body.id)
            await mySaver(team)
            res.json({succes:true,message:"Bienvenue dans la team : " + team.name})
        }
    }
})
//WIP WIP WIP
router.post("/kick", async (req,res)=> {
    const team = await Team.findById(req.body.id)
    if (team.teamLeader == req.body.teamLeaderID) {

    } else {
        res.json({succes:false,message:"Tu n'es pas le team leader"})
    }
})

router.get('/invite/:id', async (req, res) => {
    const team = await Team.findById(req.params.id)
    team.invitationLink = token()
    const savedTeam = await mySaver(team)
    res.json({token:savedTeam.invitationLink})
});

router.post('/newTeam', async (req, res) => {
    const team = new Team({
        name:req.body.name,
        teamLeader:req.body.teamLeader
    })
    res.json(await mySaver(team))
});

module.exports = router