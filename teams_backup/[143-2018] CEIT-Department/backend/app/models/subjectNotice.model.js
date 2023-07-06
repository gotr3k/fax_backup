module.exports = (sequelize, Sequelize) => {
    const SubjectNotice = sequelize.define("subjectNotice", {
      id: {
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      title:{
          type:Sequelize.STRING,
          field:'title',
          allowNull:false
      },
      subjectCode:{
        type:Sequelize.STRING,
        field:'subjectCode',
        allowNull:false,
      },
      notice: {
        type: Sequelize.TEXT,
        field: 'notice',
        allowNull:false
      },
      date: {
        type: Sequelize.DATEONLY,
        field: 'date',
        allowNull:false
      }
    });
    return SubjectNotice;
  };