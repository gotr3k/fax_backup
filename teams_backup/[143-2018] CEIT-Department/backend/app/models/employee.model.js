module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
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
      name: {
        type: Sequelize.STRING,
        field: 'name'
      },
      surname: {
        type: Sequelize.STRING,
        field: 'surname'
      },
      address: {
        type: Sequelize.STRING,
        field: 'address'
      },
      phone: {
        type: Sequelize.STRING,
        field: 'phone'
      },
      website: {
        type: Sequelize.STRING,
        field: 'website'
      },
      biography: {
        type: Sequelize.TEXT,
        field: 'biography'
      },
      rank: {
        type: Sequelize.STRING,
        field: 'rank'
      },
      room: {
        type: Sequelize.STRING,
        field: 'room'
      },
      status: {
        type: Sequelize.INTEGER,
        field: 'status'
      },
    });
    return Employee;
};