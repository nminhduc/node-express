const express = require('express');
const router = express.Router();
const db = require("../../models");
const User = db.user;
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'sceretKey';


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post('/create', async (req, res) => {

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
    let user = await User.findOne({
      where: {
        username: username,
      }
    });
    if (user === null) {
      console.log(2);
      User.create({
        username: username,
        password: password
      });
      res.send('Success');
    } else {

      console.log(3);
      res.send('Failure');
    }
  } catch (error) {
    console.log(error)
    this.error = error.message;
  }

});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
      password: password
    }
  });
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

    res.json({
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});

router.get('/getall', authenticateJWT, async (req, res) => {

  const users = await User.findAll();
  res.json({
    users
  });
});


module.exports = router;