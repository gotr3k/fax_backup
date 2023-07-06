module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
      id: {
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      name:{
        type:Sequelize.STRING,
        field:'name',
        allowNull:false,
      },
      subjectId:{
        type:Sequelize.INTEGER,
        field:'subjectId',
        allowNull:false
    },
      date:{
          type:Sequelize.DATEONLY,
          field:'date',
          allowNull:false
      },
      time:{
        type:Sequelize.STRING,
        field:'time',
        allowNull:false,
      },
      place: {
        type: Sequelize.STRING,
        field: 'place',
        allowNull:false
      },
      slots: {
        type: Sequelize.INTEGER,
        field: 'slots'
      },
      open:{
          type:Sequelize.BOOLEAN,
          field:'open'
      }
    }); 
    return List;
  };