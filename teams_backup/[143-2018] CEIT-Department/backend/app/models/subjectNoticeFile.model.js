module.exports = (sequelize, Sequelize) => {
    const SubjectNoticeFile = sequelize.define("subjectNoticeFile", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      subjectNoticeId: {
        type: Sequelize.INTEGER,
        field: 'subjectNoticeId',
        allowNull:false,
      },
      fileName:{
        type: Sequelize.STRING,
        field: 'fileName'
      },
      filePath:{
        type: Sequelize.STRING,
        field: 'filePath'
      },
      fileSize:{
        type: Sequelize.INTEGER,
        field: 'fileSize'
      }
    });
    return SubjectNoticeFile;
  };