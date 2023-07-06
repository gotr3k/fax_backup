module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    const students = require("../controllers/student.controller.js");
    const admins = require("../controllers/admin.controller.js");
    const subjects = require("../controllers/subject.controller.js");
    const subjectEmployeeLists = require("../controllers/subjectEmployeeList.controller.js");
    const subjectStudentLists = require("../controllers/subjectStudentList.controller.js");
    const notices = require("../controllers/notice.controller.js");
    const files=require("../controllers/file.controller.js");
    const subjectNotices=require("../controllers/subjectNotice.controller.js");
    const subjectNoticeFiles=require("../controllers/subjectNoticeFile.controller.js");
    const lists=require("../controllers/list.controller.js");
    const studentLists=require("../controllers/studentList.controller.js");
    const employeeAvatars=require("../controllers/employeeAvatar.controller.js");


    const multer=require('multer');
    const uuid=require('uuid').v4;
    const path=require('path');
    const moment=require("moment");

    const db = require("../models");
    const Files = db.files;
    const SubjectNoticeFiles=db.subjectNoticeFiles;
    const EmployeeAvatars=db.employeeAvatars;
    const Op = db.Sequelize.Op;

    var router = require("express").Router();
  
    //================ZAPOSLENI=================================

    // Kreiraj novog zaposlenog
    router.post("/employees", employees.create);
  
    // Vrati sve/aktivne/neaktivne zaposlene
    router.get("/employees", employees.findAll);
  
    // Vrati jednog zaposlenog na osnovu korisnickog imena i lozinke
    router.post("/employees/login", employees.login);
  
    router.post("/employees/check",employees.check);
    
    // Azuriraj zaposlenog na osnovu id
    router.put("/employees", employees.update);
  
    // Obrisi zaposlenog na osnovu korisnickog imena
    router.delete("/employees/:id", employees.delete);
  
    // Obrisi sve zaposlene
    router.delete("/employees", employees.deleteAll);

    //================STUDENTI=================================
  
    // Kreiraj novog studenta
    router.post("/students", students.create);
  
    // Vrati sve/aktivne/neaktivne studente
    router.get("/students", students.findAll);
  
    // Vrati jednog studenta na osnovu korisnickog imena i lozinke
    router.post("/students/login", students.login);

    router.post("/students/check",students.check);
  
    // Azuriraj studenta na osnovu id-ja
    router.put("/students", students.update);
  
    // Obrisi studenta na osnovu id-ja
    router.delete("/students/:id", students.delete);
  
    // Obrisi sve studente
    router.delete("/students", students.deleteAll);

    //================ADMINI=================================

    // Kreiraj novog admina
    router.post("/admins", admins.create);
  
    // Vrati sve admine
    router.get("/admins", admins.findAll);
      
    // Vrati jednog admina na osnovu korisnickog imena i lozinke
    router.post("/admins/login", admins.login);
      
    // Azuriraj admina na osnovu korisnickog imena
    router.put("/admins", admins.update);
      
    // Obrisi admina na osnovu korisnickog imena
    router.delete("/admins/:username", admins.delete);
      
    // Obrisi sve admine
    router.delete("/admins", admins.deleteAll);

    //=====================PREDMETI===============================
    
    // Kreiraj novi predmet
    router.post("/subjects", subjects.create);
  
    // Vrati sve predmete
    router.get("/subjects", subjects.findAll);
      
    // Vrati sve RTI predmete
    router.get("/subjects/RTI", subjects.findAllRTI);
    
    // Vrati sve SI predmete
    router.get("/subjects/SI", subjects.findAllSI);
    
    // Vrati sve ostale predmete
    router.get("/subjects/Ostali", subjects.findAllOstali);
    
    // Vrati sve master predmete
    router.get("/subjects/Master", subjects.findAllMaster);
      
    //Vrati predmete iz odredjenog
    router.post("/subjects/Semestar", subjects.findAllSemester);

    //Vrati predmete iz odredjenog semestra i departmenta
    router.post("/subjects/OdsekSemestar", subjects.findAllDepartmentSemester);

    //Vrati jedan predmet na osnovu id
    router.get("/subjects/:id",subjects.getSubject);

    router.post("/subjects/check",subjects.check);

    // Azuriraj predmet na osnovu sifre
    router.put("/subjects", subjects.update);
      
    // Obrisi predmet na osnovu sifre i departmenta
    router.delete("/subjects/:id", subjects.delete);
      
    // Obrisi sve predmete
    router.delete("/subjects", subjects.deleteAll);

    //=====================ANGAZOVANJA===============================
    
    // Kreiraj novo angazovanje
    router.post("/angazovanja", subjectEmployeeLists.create);
  
    // Vrati sva angazovanja
    router.get("/angazovanja", subjectEmployeeLists.findAll);
      
    // Vrati sva angazovanja na osnovu sifre predmeta
    router.post("/angazovanja/predmet", subjectEmployeeLists.getAllEmployeesOfSubject);

    // Vrati sva angazovanja predavanja na osnovu sifre predmeta
    router.post("/angazovanja/predmetPredavanja", subjectEmployeeLists.getAllEmployeesOfSubjectLectures);

    // Vrati sva angazovanja vezbi na osnovu sifre predmeta
    router.post("/angazovanja/predmetVezbe", subjectEmployeeLists.getAllEmployeesOfSubjectExc);

    // Vrati sva angazovanja na osnovu imena zaposlenog
    router.post("/angazovanja/zaposleni", subjectEmployeeLists.getAllSubjectsOfEmployee);

    // Vrati sva angazovanja predavanja na osnovu imena zaposlenog
    router.post("/angazovanja/zaposleniPredavanja", subjectEmployeeLists.getAllSubjectsOfEmployeeLectures);

    // Vrati sva angazovanja vezbi na osnovu imena zaposlenog
    router.post("/angazovanja/zaposleniVezbe", subjectEmployeeLists.getAllSubjectsOfEmployeeExc);

    // Vrati sve tipove i grupe angazovanja na osnovu predmeta i zaposlenog
    router.post("/angazovanja/TG", subjectEmployeeLists.getAllTG);

    // Obrisi angazovanja na osnovu sifre predmeta
    router.delete("/angazovanja/predmet/:subjectId", subjectEmployeeLists.deleteBySubject);

    // Obrisi angazovanja na osnovu usernamea zaposlenog
    router.delete("/angazovanja/zaposleni/:employeeUsername", subjectEmployeeLists.deleteByEmployee);

    //Obrisi sva angazovanja
    router.delete("/angazovanja",subjectEmployeeLists.deleteAll);

    //=====================SLUSANJA===============================
    
    // Kreiraj novo slusanje
    router.post("/slusanja", subjectStudentLists.create);
  
    // Vrati sva slusanja
    router.get("/slusanja", subjectStudentLists.findAll);
      
    // Vrati sva slusanja na osnovu sifre predmeta
    router.post("/slusanja/predmet", subjectStudentLists.getAllStudentsOfSubject);

    // Vrati sva slusanja na osnovu imena studenta
    router.post("/slusanja/student", subjectStudentLists.getAllSubjectsOfStudent);

    // Obrisi slusanja na osnovu sifre predmeta i usernamea studenta
    router.delete("/slusanja/predmetStudent/:subjectId/:studentUsername", subjectStudentLists.deleteSubjectStudent);

    // Obrisi slusanja na osnovu sifre predmeta
    router.delete("/slusanja/predmet/:subjectId", subjectStudentLists.deleteBySubject);

    // Obrisi slusanja na osnovu usernamea studenta
    router.delete("/slusanja/student/:studentUsername", subjectStudentLists.deleteByStudent);

    //Obrisi sva slusanja
    router.delete("/slusanja",subjectStudentLists.deleteAll);

    //=====================OBAVESTENJA===============================
    
    // Kreiraj novo obavestenje
    router.post("/obavestenja", notices.create);
  
    // Vrati sva obavestenja
    router.get("/obavestenja", notices.findAll);
      
    // Vrati sva obavestenja u posl 3 meseca
    router.get("/obavestenja/3meseca", notices.findAllPast3Months);

    // Vrati obavestenje na osnovu naslova, kategorije i datuma
    router.post("/obavestenja/jedno", notices.findOne);

    //updejt na osnovu id iz bodyja
    router.put("/obavestenja", notices.update);

    // Obrisi obavestenje na osnovu id-a
    router.delete("/obavestenja/:id", notices.delete);

    //Obrisi sva obavestenja
    router.delete("/obavestenja",notices.deleteAll);

    //=====================FAJLOVI===============================
    const fileStorage=multer.diskStorage({
      destination:(req,file,cb)=>{
          cb(null,'./uploads');
      },
      filename:(req,file,cb)=>{
          //dohvatanje parametara putanje fajla koji idu u bazu zajedno sa putanjom fajla iz (naci neki bolji nacin za ovo!)
          var name=file.originalname;
          const ext=path.extname(name);
          const size=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const employeeFullName=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const subjectCode=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const type=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const id=uuid();//jedinstveni identifikator fajla
          const filePath=`files/${id}${ext}`;
          const fileDB = {//kreiranje unosa u bazu
            employeeFullName:employeeFullName,
            subjectCode : subjectCode,
            fileName: path.basename(name),
            filePath: filePath,
            type: type,
            uploadDate:moment(),
            fileSize:size
        };
        Files.create(fileDB)//unos u bazu
        .then(data => {
          cb(null,filePath);
          res.send(data); 
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom uploadovanja novog fajla " + id+ ext
          });
        });
          //cb(null,filePath);
      }
    });

    const fileUpload=multer({storage:fileStorage});

    //uploaduj fajlove
    router.post("/files", fileUpload.single('file'), files.create);

    //vrati fajlove na osnovu predmeta i tipa
    router.post("/filesGetBySubjectAndType",files.getBySubjectAndType);

    //downloadovanje fajla
    router.get("/files/download",files.download);

    // Obrisi fajl (iz baze) na osnovu id-a - dodati da se brise i sa diska
    router.delete("/files/:id", files.delete);
    
    //=======================OBAVESTENJA O PREDMETIMA=====================================

    // Kreiraj novo obavestenje
    router.post("/predmetnaObavestenja", subjectNotices.create);
  
    // Vrati sva obavestenja
    router.get("/predmetnaObavestenja", subjectNotices.findAll);
      
    // Vrati sva obavestenja u posl 3 meseca
    router.get("/predmetnaObavestenja/7dana", subjectNotices.findAllPast7Days);

    // Vrati obavestenje na osnovu naslova, predmeta i datuma
    router.post("/predmetnaObavestenja/jedno", subjectNotices.findOne);

    //updejt na osnovu id iz bodyja
    router.put("/predmetnaObavestenja", subjectNotices.update);

    // Obrisi obavestenje na osnovu id-a
    router.delete("/predmetnaObavestenja/:id", subjectNotices.delete);

    //Obrisi sva obavestenja
    router.delete("/predmetnaObavestenja", subjectNotices.deleteAll);

    //=====================PREDMETNA OBAVESTENJA FAJLOVI===============================
    const subjectNoticeFileStorage=multer.diskStorage({
      destination:(req,file,cb)=>{
          cb(null,'./uploads');
      },
      filename:(req,file,cb)=>{
          //dohvatanje parametara putanje fajla koji idu u bazu zajedno sa putanjom fajla iz (naci neki bolji nacin za ovo!)
          var name=file.originalname;
          const ext=path.extname(name);
          const subjectNoticeId=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const size=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const id=uuid();//jedinstveni identifikator fajla
          const filePath=`files/${id}${ext}`;
          const subjectNoticeFileDB = {//kreiranje unosa u bazu
            subjectNoticeId:subjectNoticeId,
            fileName: path.basename(name),
            filePath: filePath,
            fileSize:size
        };
        SubjectNoticeFiles.create(subjectNoticeFileDB)//unos u bazu
        .then(data => {
          cb(null,filePath);
          res.send(data); 
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom uploadovanja novog fajla " + id+ ext
          });
        });
      }
    });

    const subjectNoticeFileUpload=multer({storage:subjectNoticeFileStorage});

    //uploaduj fajlove
    router.post("/subjectNoticeFiles", subjectNoticeFileUpload.single('file'), subjectNoticeFiles.create);

    //vrati fajlove na osnovu predmeta i tipa
    router.post("/subjectNoticeFilesGetByNoticeId",subjectNoticeFiles.getByNoticeId);

    //downloadovanje fajla
    router.get("/subjectNoticeFiles/download",subjectNoticeFiles.download);

    // Obrisi fajl (iz baze) na osnovu id-a - dodati da se brise i sa diska
    router.delete("/subjectNoticeFiles/:id", subjectNoticeFiles.delete);

    // Obrisi fajlove (iz baze) na osnovu id-a obavestenja - dodati da se brise i sa diska
    router.delete("/subjectNoticeFilesDeleteByNoticeId/:id", subjectNoticeFiles.deleteByNoticeId);

    // Obrisi sve unose (iz baze) - dodati da se fajlovi brisu i sa diska
    router.delete("/subjectNoticeFiles", subjectNoticeFiles.deleteAll);

    //================================SPISKOVI============================================

    // Kreiraj novi spisak
    router.post("/lists", lists.create);
  
    // Vrati sve spiskove
    router.get("/lists", lists.findAll);
      
    // Vrati sve spiskove vezane za predmet
    router.post("/listsBySubject", lists.findAllBySubject);

    // Vrati sve otvorene spiskove vezane za predmet
    router.post("/listsOpenBySubject", lists.findOpenBySubject);

    //Updejt na osnovu id iz bodyja
    router.put("/lists", lists.update);

    // Obrisi spisak na osnovu id-a
    router.delete("/lists/:id", lists.delete);

    //Obrisi sve spiskove
    router.delete("/lists", lists.deleteAll);

    //==========================STUDENTI NA SPISKOVIMA========================================

    // Kreiraj novu prijavu
    router.post("/prijave", studentLists.create);
  
    // Vrati sve prijave
    router.get("/prijave", studentLists.findAll);
      
    // Vrati sve prijave na osnovu spiska
    router.post("/prijaveByList", studentLists.getAllByList);

    // Vrati sve otvorene spiskove vezane za predmet
    router.post("/prijaveByStudent", studentLists.getAllByStudent);

    // Obrisi prijavu na osnovu spiska i korisnickog imena studenta
    router.delete("/prijave/:listId/:studentUsername", studentLists.deleteByStudentList);

     // Obrisi prijavu na osnovu spiska
     router.delete("/prijaveByList/:listId", studentLists.deleteByList);

      // Obrisi prijavu na osnovu korisnickog imena studenta
    router.delete("/prijaveByStudent/:studentUsername", studentLists.deleteByStudent);

    //Obrisi sve prijave
    router.delete("/prijave", studentLists.deleteAll);

    //=====================AVATARI ZAPOSLENIH===============================
    const employeeAvatarStorage=multer.diskStorage({
      destination:(req,file,cb)=>{
          cb(null,'./uploads');
      },
      filename:(req,file,cb)=>{
          //dohvatanje parametara putanje fajla koji idu u bazu zajedno sa putanjom fajla iz (naci neki bolji nacin za ovo!)
          var name=file.originalname;
          const ext=path.extname(name);
          const employeeId=name.substring(0,name.indexOf('*'));
          name=name.substring(name.indexOf('*')+1,name.length);
          const id=uuid();//jedinstveni identifikator fajla
          const filePath=`files/${id}${ext}`;
          const employeeAvatarDB = {//kreiranje unosa u bazu
            employeeId:employeeId,
            fileName: path.basename(name),
            filePath: filePath,
        };
        EmployeeAvatars.create(employeeAvatarDB)//unos u bazu
        .then(data => {
          cb(null,filePath);
          res.send(data); 
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom uploadovanja novog fajla " + id+ ext
          });
        });
      }
    });

    const employeeAvatarUpload=multer({storage:employeeAvatarStorage});

    //uploaduj avatara
    router.post("/employeeAvatars", employeeAvatarUpload.single('file'), employeeAvatars.create);

    //vrati avatara na osnovu id-ja zaposlenog
    router.post("/employeeAvatarsGetByEmployeeId",employeeAvatars.getByEmployeeId);

    //downloadovanje avatara
    router.get("/employeeAvatars/download",employeeAvatars.download);

    //prikazivanjee avatara
    router.get("/employeeAvatars/display",employeeAvatars.display);

    // Obrisi avatara (iz baze) na osnovu id-a - dodati da se brise i sa diska
    router.delete("/employeeAvatars/:id", employeeAvatars.delete);

    // Obrisi avatara (iz baze) na osnovu id-a zaposlenog - dodati da se brise i sa diska
    router.delete("/employeeAvatarsDeleteByEmployeeId/:id", employeeAvatars.deleteByEmployeeId);

    // Obrisi sve unose (iz baze) - dodati da se fajlovi brisu i sa diska
    router.delete("/employeeAvatars", employeeAvatars.deleteAll);

    app.use('/api', router);
  };