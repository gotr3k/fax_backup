module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
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
      },
      index: {
        type: Sequelize.STRING,
        field: 'index'
      },
      type: {
        type: Sequelize.STRING,
        field: 'type'
      },
      name: {
        type: Sequelize.STRING,
        field: 'name'
      },
      surname: {
        type: Sequelize.STRING,
        field: 'surname'
      },
      status: {
        type: Sequelize.INTEGER,
        field: 'status'
      },
    });
  
    return Student;
  };