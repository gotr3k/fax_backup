const db = require("../models");
const SubjectStudentLists = db.subjectStudentLists;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje
exports.create = (req, res) => {
    // Provera neophodnih polja
    if (!req.body.studentUsername || !req.body.subjectId) {
      res.status(400).send({
        message: "Polje ne može biti prazno!"
      });
      return;
    }
  
    // Kreiranje
    const list = {
      studentUsername:req.body.studentUsername,
      subjectId:req.body.subjectId,
    };

    

    //Trazenje u bazi da li postoji unos sa istim id-jem predmeta i studentskim usernameom
    SubjectStudentLists.findAll({ where: {subjectId: req.body.subjectId, studentUsername:req.body.studentUsername} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        SubjectStudentLists.create(list)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog slusanja na predmetu"
          });
        });
      } else {
        res.status(400).send({
          message: `Slusanje (predmet: ${req.body.subjectId}, student: ${req.body.studentUsername} već postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greška prilikom pretrage tabele predmeta za slusanjem (predmet: "+ req.body.subjectId +", student: "+req.body.studentUsername+") "
      });
    });
  };

// Vracanje svih unosa
exports.findAll = (req, res) => {
    SubjectStudentLists.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih angazovanja!"
      });
    });
};

// Vracanje svih Predmeta koje slusa student sa odredjenim usernameom
exports.getAllSubjectsOfStudent = (req, res) => {
    SubjectStudentLists.findAll({ where: {studentUsername:req.body.studentUsername} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta koje slusa student "+req.body.studentUsername
        });
    });
};


// Vracanje svih studenata koji slusaju predmet sa odredjenom sifrom
exports.getAllStudentsOfSubject = (req, res) => {
    SubjectStudentLists.findAll({ where: {subjectId:req.body.subjectId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih studenata koji slusaju predmet "+req.body.subjectId
        });
    });
};

// Brisanje unosa na osnovu id-ja predmeta i usernamea studenta
exports.deleteSubjectStudent = (req, res) => {
    const subjectId = req.params.subjectId;
    const studentUsername=req.params.studentUsername;
    SubjectStudentLists.destroy({
      where: { subjectId: subjectId, studentUsername:studentUsername }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Slusanje je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje slusanja studenta ${studentUsername} za predmet sa id-jem ${subjectId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja slusanja studenta" + studentUsername + " za predmet sa id-jem " + subjectId
        });
      });
  };

// Brisanje svih unosa na osnovu id-ja predmeta
exports.deleteBySubject = (req, res) => {
    const subjectId = req.params.subjectId;
  
    SubjectStudentLists.destroy({
      where: { subjectId: subjectId }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Slusanje je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje slusanja za predmet sa id-jem ${subjectId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja slusanja za predmet sa id-jem " + subjectId
        });
      });
  };

// Brisanje svih unosa na osnovu usernamea studenta
exports.deleteByStudent = (req, res) => {
    const studentUsername = req.params.studentUsername;
    SubjectStudentLists.destroy({
      where: { studentUsername: studentUsername }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Slusanje je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje slusanja za studenta ${studentUsername}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja slusanja za studenta " + studentUsername
        });
      });
  };

// Brisanje svih slusanja
exports.deleteAll = (req, res) => {
    SubjectStudentLists.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisana sva slusanja. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih slusanja!"
        });
      });
  };