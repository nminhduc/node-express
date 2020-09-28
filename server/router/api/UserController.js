const express = require('express');
const router = express.Router();
const db = require("../../models");
const User = db.user;

router.post('/create', async(req,res) =>{

    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    var username = req.body.username;
    var password = req.body.password;
    // async function findUser (username) {
    //     return await User.findOne({
    //       where: {
    //         username: username,
    //       }
    //     });
    // }
     try {
       let user = await User.findOne({ where: {
                username: username,
              }});
         if(user === null){  
             console.log(2);  
            User.create({
                username: username,
                password: password
            });
            res.send('Success')  ;
         } else {

             console.log(3); 
            res.send('Failure')  ;
         }
    } catch (error) {
        console.log(error)
        this.error = error.message;
    } 
   
});

module.exports = router;