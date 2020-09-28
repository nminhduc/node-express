const db = require("./models");
const User = db.user;
db.sequelize.sync().then(() => {
    initial();
  });
   function initial() {
    try {
    User.create({
        username: "test",
        password: "123456"
    });
   
    User.create({
        username: "test2",
        password: "123456"
    });
   
    User.create({
        username: "test3",
        password: "123456"
    });
    } catch (err) {
        this.error = err.message;
    }   
  }