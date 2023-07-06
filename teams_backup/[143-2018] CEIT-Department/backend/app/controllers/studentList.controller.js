const db = require("../models");
const StudentLists = db.studentLists;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje
exports.create = (req, res) => {
    // Provera neophodnih polja
    if (!req.body.studentUsername || !req.body.listId) {
      res.status(400).send({
        message: "Polje ne može biti prazno!"
      });
      return;
    }
  
    // Kreiranje
    const list = {
      studentUsername:req.body.studentUsername,
      listId:req.body.listId,
    };

    

    //Trazenje u bazi da li postoji unos sa istim id-jem spiska i studentskim usernameom
    StudentLists.findAll({ where: {listId: req.body.listId, studentUsername:req.body.studentUsername} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        StudentLists.create(list)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog unosa na spisak"
          });
        });
      } else {
        res.status(400).send({
          message: `Spisak (id:${req.body.listId}, student: ${req.body.studentUsername} već postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greška prilikom pretrage tabele za spiskom (id: "+ req.body.listId +", student: "+req.body.studentUsername+") "
      });
    });
  };

// Vracanje svih unosa
exports.findAll = (req, res) => {
    StudentLists.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih spiskova studenata!"
      });
    });
};

// Vracanje svih unosa na osnovu id-ja spiska
exports.getAllByList = (req, res) => {
    StudentLists.findAll({ where: {listId:req.body.listId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih unosa za spisak "+req.body.listId
        });
    });
};

// Vracanje svih unosa na osnovu id-ja spiska
exports.getAllByStudent = (req, res) => {
    StudentLists.findAll({ where: {studentUsername:req.body.studentUsername} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih prijava studenta "+req.body.studentUsername
        });
    });
};


// Brisanje unosa na osnovu id-ja predmeta i usernamea studenta
exports.deleteByStudentList = (req, res) => {
    const listId = req.params.listId;
    const studentUsername=req.params.studentUsername;
    StudentLists.destroy({
      where: { listId: listId, studentUsername:studentUsername }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Unos obrisan"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje unosa za studenta ${studentUsername} na spisku sa id-jem ${listId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja unosa za studenta" + studentUsername + " na spisku sa id-jem " + listId
        });
      });
  };

// Brisanje svih unosa na osnovu id-ja spiska
exports.deleteByList = (req, res) => {
    const listId = req.params.listId;
  
    StudentLists.destroy({
      where: { listId: listId }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Unosi obrisani!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje unosa za spisak sa id-jem ${listId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja svih unosa za spisak sa id-jem " + listId
        });
      });
  };

// Brisanje svih unosa na osnovu usernamea studenta
exports.deleteByStudent = (req, res) => {
    const studentUsername = req.params.studentUsername;
    StudentLists.destroy({
      where: { studentUsername: studentUsername }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Unosi obrisani!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje svih unosa za studenta ${studentUsername}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja svih unosa za studenta " + studentUsername
        });
      });
  };

// Brisanje svih unosa
exports.deleteAll = (req, res) => {
    StudentLists.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisani svi unosi. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih unosa!"
        });
      });
  };