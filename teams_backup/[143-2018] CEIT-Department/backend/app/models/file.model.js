module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      employeeFullName: {
        type: Sequelize.STRING,
        field: 'employeeFullName'
      },
      subjectCode: {
        type: Sequelize.STRING,
        field: 'subjectCode'
      },
      type:{
        type: Sequelize.STRING,
        field: 'type'
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
      },
      uploadDate:{
        type: Sequelize.DATEONLY,
        field: 'uploadDate'
      }
    });
    return File;
  };