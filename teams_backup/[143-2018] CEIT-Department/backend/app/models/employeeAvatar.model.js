module.exports = (sequelize, Sequelize) => {
    const EmployeeAvatar = sequelize.define("employeeAvatar", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      employeeId: {
        type: Sequelize.INTEGER,
        field: 'employeeId',
        allowNull:false,
      },
      fileName:{
        type: Sequelize.STRING,
        field: 'fileName',
        allowNull:false
      },
      filePath:{
        type: Sequelize.STRING,
        field: 'filePath',
        allowNull:false,
      }
    });
    return EmployeeAvatar;
  };