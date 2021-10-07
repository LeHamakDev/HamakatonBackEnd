const express =  require("express");
const router = express.Router();
const Team = require('../models/Team');
const User = require("../models/User");
const tools =  require("../myModules/myModules.js")

router.get('/list', async (req, res) => {
    try {
        const teams = await Team.find({}, {name:1, teamLeader:1, id:1})
        tools.suc(res, "Here is your list", teams)
    } catch(e) {
        tools.err(res,e)
    }
})

router.post('/join', async (req,res) => {
    try {
        const user = await tools.verifyToken(req.body.token)
        const team = await Team.findOne({invitationLink:req.body.teamToken})
        if (user) {
            if(!team) {
                tools.err(res, "Invalid Team Token")
            } else {
                if (team.members.includes(user._id)) {
                    tools.suc(res, "Deja enregistré")
                } else {
                    team.members.push(user._id)
                    const save = await tools.mySaver(team)
                    await user.updateOne({team:save._id})
                    tools.suc(res, "Bienvenue dans la team : " + team.name)
                }
            }
        } else {
            tools.badToken(res)
        }
    } catch (error) {
        tools.err(res, error)
    }
    
})

router.post("/kick", async (req,res)=> {
    try {
        const teamLeader = await tools.verifyToken(req.body.token)
        const team = await Team.findById(teamLeader.team)
        const user = await User.findById(req.body.memberID)
        if (team.teamLeader == teamLeader._id) {
            const index = team.members.indexOf(req.body.memberID);
            if (index > -1) {
                var teamMem = team.members
                teamMem.splice(index, 1)
                await user.updateOne({team:null})
                await team.updateOne({members:teamMem})
                tools.suc(res, "Kicked!")
            } else {
                tools.err(res, "This memeber does not exist")
            }
        } else {
            tools.err(res, "Tu n'es pas le team leader")
        }
    } catch (error) {
        tools.err(res, error)
    }
})

router.post('/invite', async (req, res) => {
    try {
        const user = await tools.verifyToken(req.body.token)
        if (user) {
            const team = await Team.findById(user.team)
            team.invitationLink = tools.token()
            const savedTeam = await tools.mySaver(team)
            tools.suc(res, "Here is your token", {token:savedTeam.invitationLink})
        }
    } catch (error) {
        tools.err(res, error)
    }
    
});

router.post('/newTeam', async (req, res) => {
    const user = await tools.verifyToken(req.body.token)
    if(user) {
        if (!user.team) {
            try {
                const team = new Team({
                    name:req.body.name,
                    token:tools.token(),
                    teamLeader:user._id
                })
                const save = await tools.mySaver(team)
                tools.suc(res, "Team crée", save)
                await user.updateOne({team:save._id})
            } catch (error) {
                tools.err(res, error)
            }
        } else {
            tools.err(res, "vous appartenez deja a une team")
        }
    } else {
        tools.badToken(res)
    }
    
});

module.exports = router