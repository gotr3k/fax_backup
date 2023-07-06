module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {
      id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      code: {
        type: Sequelize.STRING,
        field: 'code'
      },
      name: {
        type: Sequelize.STRING,
        field: 'name'
      },
      department: {
        type: Sequelize.INTEGER,
        field: 'department'
      },
      semester: {
        type: Sequelize.INTEGER,
        field: 'semester'
      },
      espb: {
        type: Sequelize.INTEGER,
        field: 'espb'
      },
      type: {
        type: Sequelize.INTEGER,
        field: 'type'
      },
      lectures: {
        type: Sequelize.FLOAT,
        field: 'lectures'
      },
      exc: {
        type: Sequelize.FLOAT,
        field: 'exc'
      },
      lab: {
        type: Sequelize.FLOAT,
        field: 'lab'
      },
      goal: {
        type: Sequelize.TEXT,
        field: 'goal'
      },
      result: {
        type: Sequelize.TEXT,
        field: 'result'
      },
      lectureWhen: {
        type: Sequelize.STRING,
        field: 'lectureWhen'
      },
      excWhen: {
        type: Sequelize.STRING,
        field: 'excWhen'
      },
      comment: {
        type: Sequelize.TEXT,
        field: 'comment'
      },
      examVisible: {
        type: Sequelize.BOOLEAN,
        field: 'examVisible'
      },
      labVisible: {
        type: Sequelize.BOOLEAN,
        field: 'labVisible'
      },
      projectVisible: {
        type: Sequelize.BOOLEAN,
        field: 'projectVisible'
      }
    });
    return Subject;
};