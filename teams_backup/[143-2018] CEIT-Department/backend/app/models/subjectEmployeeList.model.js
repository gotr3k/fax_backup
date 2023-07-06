module.exports = (sequelize, Sequelize) => {
    const SubjectEmployeeList = sequelize.define("subjectEmployeeList", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      employeeUsername: {
        type: Sequelize.STRING,
        field: 'employeeUsername',
        allowNull:false
      },
      subjectId: {
        type: Sequelize.INTEGER,
        field: 'subjectId',
        allowNull:false
      },
      type: {
        type: Sequelize.STRING,
        field: 'type',
        allowNull:false
      },
      group:{
          type:Sequelize.INTEGER,
          field:'group',
          allowNull:false
      }
    });
    return SubjectEmployeeList;
};