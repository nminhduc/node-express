const express = require('express');
const router = express.Router();
const db = require("../../models");
const User = db.user;
router.post('/create', async(req,res) =>{
    var username = req.body.username;
    var password = req.body.password;
    async function findUser (username) {
        return await User.findOne({
          where: {
            username: username,
          }
        });
    }
     try {
        let user = await findUser(username);
        if(user == null){    
            User.create({
                username: username,
                password: password
            });
            res.send('Success')  ;
        }
        res.send('Failure')  ;
    } catch (error) {
        this.error = error.message;
    } 
   
});

module.exports = router;