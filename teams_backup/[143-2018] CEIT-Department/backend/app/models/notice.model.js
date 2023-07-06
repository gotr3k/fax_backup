module.exports = (sequelize, Sequelize) => {
    const Notice = sequelize.define("notice", {
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
      category:{
        type:Sequelize.INTEGER,
        field:'category',
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
  
    return Notice;
  };