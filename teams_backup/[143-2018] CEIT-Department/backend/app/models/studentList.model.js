module.exports = (sequelize, Sequelize) => {
    const StudentList = sequelize.define("studentList", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      studentUsername: {
        type: Sequelize.STRING,
        field: 'studentUsername',
        allowNull:false
      },
      listId: {
        type: Sequelize.INTEGER,
        field: 'listId',
        allowNull:false
      },
    });
    return StudentList;
};