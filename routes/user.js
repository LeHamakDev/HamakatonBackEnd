const express =  require("express");    
const router = express.Router();
const User = require('../models/User')
var sha256 = require('js-sha256');

var rand = function() {
    return Math.random().toString(36).substr(2);
};
var token = function() {
    return rand() + rand();
};

async function verifyToken(token) {
    try {
        const user = await User.findOne({token:token})
        return user
    } catch (error) {
        console.log("error", error)
        return null
    }
}

async function mySaver(s) {
    try {
        const save = await s.save()
        return(save)
    } catch(err) {
        return({message:err})
    }
}

router.post("/updateRole", async (req, res) => {
    try {
        const user = await verifyToken(req.body.token)
        await user.updateOne({role:req.body.role})
        res.json({success:true, message:"Role up"})
    } catch(e) {
        res.json({success:false, message:"err"})
    }
})

router.get('/list', async (req, res) => {
    const user = await verifyToken(req.body.token)
    if (user) {
        try {
            const users = await User.find({}, {pseudo:1, role:1, description:1})
            res.json(users)
        } catch(e) {
            res.json({message:e})
        }
    } else {
        res.json({success:false, message:"Bad Token"})
    }
})

router.post('/login', async (req, res) => {
   if (req.body.login.includes("@")) {
        try {
            const user = await User.findOne({email:req.body.login, hash:sha256(req.body.password)});
            user.token = token()
            await user.save()
            res.json(user);
        }catch(err){
            res.json({message:err})
        }
   } else {
        try {
            const user = await User.findOne({login:req.body.login, hash:sha256(req.body.password)});
            user.token = token()
            await user.save()
            res.json(user);
        }catch(err){
            res.json({message:err})
        }
   }
});

router.post('/register', async (req, res) => {
    const user = new User({
        login:req.body.login,
        hash:sha256(req.body.password),
        pseudo:req.body.pseudo,
        email:req.body.email
    })
    res.json(await mySaver(user))
});

module.exports = router;
