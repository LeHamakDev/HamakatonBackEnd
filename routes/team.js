const express =  require("express");
const router = express.Router();
const Team = require('../models/Team')
const User = require("../models/User")
const tools =  require("../myModules/myModules.js")

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

router.get('/list', async (req, res) => {
    try {
        const teams = await Team.find({}, {name:1, teamLeader:1, id:1})
        res.json(teams)
    } catch(e) {
        res.json({message:e})
    }
})

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

router.post("/kick", async (req,res)=> {
    const team = await Team.findById(req.body.id)
    if (team.teamLeader == req.body.teamLeaderID) {
        const teamLeader = await User.findById(req.body.teamLeaderID)
        if (teamLeader.token == req.body.token) {
            const index = team.members.indexOf(req.body.memberID);
            if (index > -1) {
                team.members.splice(index, 1);
                res.json({succes:true, message:"Kicked!"})
            }
        } else {
            res.json({succes:false,message:"Wrong token"})
        }
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
    const user = await tools.verifyToken(req.body.token)
    if(user) {
        if (!user.team) {
            try {
                const team = new Team({
                    name:req.body.name,
                    teamLeader:user._id
                })
                const save = await mySaver(team)
                tools.suc(res, "Team crée", save)
                await user.updateOne({team:save._id})
            } catch (error) {
                tools.err(res, error)
            }
        } else {
            tools.err(res, "vous appartenez deja a une team")
        }
    } else {
        tools.err(res, "bad token")
    }
    
});

module.exports = router