const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./student.model.js")(sequelize, Sequelize);
db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.admins = require("./admin.model.js")(sequelize, Sequelize);
db.subjects = require("./subject.model.js")(sequelize, Sequelize);
db.subjectEmployeeLists = require("./subjectEmployeeList.model.js")(sequelize, Sequelize);
db.subjectStudentLists = require("./subjectStudentList.model.js")(sequelize, Sequelize);
db.notices = require("./notice.model.js")(sequelize, Sequelize);
db.files=require("./file.model.js")(sequelize, Sequelize);
db.subjectNotices=require("./subjectNotice.model.js")(sequelize, Sequelize);
db.subjectNoticeFiles=require("./subjectNoticeFile.model.js")(sequelize, Sequelize);
db.lists=require("./list.model.js")(sequelize, Sequelize);
db.studentLists = require("./studentList.model.js")(sequelize, Sequelize);
db.employeeAvatars = require("./employeeAvatar.model.js")(sequelize, Sequelize);


module.exports = db;