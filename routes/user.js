const express =  require("express");    
const router = express.Router();
const User = require('../models/User')
var sha256 = require('js-sha256');

const tools = require('../myModules/myModules')

router.post("/updateRole", async (req, res) => {
    try {
        const user = await tools.verifyToken(req.body.token)
        await user.updateOne({role:req.body.role})
        tools.suc(res, "Role up", null)
    } catch(e) {
        tools.suc(res, e)
    }
})

router.post('/list', async (req, res) => {
    const user = await tools.verifyToken(req.body.token)
    if (user) {
        try {
            const users = await User.find({}, {pseudo:1, role:1, description:1, team:1})
            tools.suc(res, "Here is your list", users)
        } catch(e) {
            tools.err(res, e)
        }
    } else {
        tools.badToken(res)
    }
})

router.post('/login', async (req, res) => {
   if (req.body.login.includes("@")) {
        try {
            const user = await User.findOne({email:req.body.login, hash:sha256(req.body.password)});
            user.token = tools.token()
            await user.save()
            tools.suc(res, "Login success", user)
        }catch(err){
            tools.err(res, err)
        }
   } else {
       console.log("else")
        try {
            const user = await User.findOne({login:req.body.login, hash:sha256(req.body.password)});
            user.token = tools.token()
            await user.save()
            tools.suc(res, "Login success", user)
        }catch(err){
            tools.err(res, err)
        }
   }
});

router.post('/register', async (req, res) => {
    const exUsers = await User.find({ $or: [
        { email: req.body.email },
        { login: req.body.login },
        { pseudo:req.body.pseudo }
    ]})
    try {
        if (exUsers.length == 0) 
            {
            const user = new User({
                login:req.body.login,
                hash:sha256(req.body.password),
                pseudo:req.body.pseudo,
                email:req.body.email
            })
            tools.suc(res, "User Created", await tools.mySaver(user))
          } else {
            tools.err(res, "Email, pseudo ou login déja existant")
          }
    } catch (err) {
        tools.err(res, err)
    }
    
});

module.exports = router;
//5w9wo3zqsmo4sbey328q0k
//yumfrbi893pblademwfle7
//u93tuqo6x4cbb8xd5fw4uc