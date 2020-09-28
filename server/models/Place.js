module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define("place", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      orders: {
        type: Sequelize.STRING
      }
    });
    return Place;
  };