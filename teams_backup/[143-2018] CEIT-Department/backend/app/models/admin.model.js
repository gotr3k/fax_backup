module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      username: {
        type: Sequelize.STRING,
        field: 'username'
      },
      password: {
        type: Sequelize.STRING,
        field: 'password'
      }
    });
    return Admin;
  };