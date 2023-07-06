module.exports = (sequelize, Sequelize) => {
    const SubjectStudentList = sequelize.define("subjectStudentList", {
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
      subjectId: {
        type: Sequelize.INTEGER,
        field: 'subjectId',
        allowNull:false
      },
    });
    return SubjectStudentList;
};