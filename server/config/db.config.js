module.exports = {
    HOST: "127.0.0.1",
    PORT: 3306,
    USER: "root",
    PASSWORD: "",
    DB: "booking_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 1000,
      idle: 1000
    }
  };