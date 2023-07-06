const db = require("../models");
const SubjectEmployeeLists = db.subjectEmployeeLists;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje
exports.create = (req, res) => {
    // Provera neophodnih polja
    if (!req.body.employeeUsername || !req.body.subjectId || !req.body.type || !req.body.group) {
      res.status(400).send({
        message: "Polje ne može biti prazno!"
      });
      return;
    }
  
    // Kreiranje
    const list = {
      employeeUsername:req.body.employeeUsername,
      subjectId:req.body.subjectId,
      type:req.body.type,
      group:req.body.group
    };

    SubjectEmployeeLists.create(list)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog angazovanja na predmetu"
          });
        });
  };

// Vracanje svih unosa
exports.findAll = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {} })
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

// Vracanje svih Predmeta na kojima je Zaposleni sa odredjenim usernameom
exports.getAllSubjectsOfEmployee = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {employeeUsername:req.body.employeeUsername} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta na kojima je zaposleni "+req.body.employeeUsername
        });
    });
};

// Vracanje svih Predmeta na kojima Zaposleni sa odredjenim usernameom predaje
exports.getAllSubjectsOfEmployeeLectures = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {employeeUsername:req.body.employeeUsername, type:'P'} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta na kojima predaje "+req.body.employeeUsername
        });
    });
};

// Vracanje svih Predmeta na kojima zaposleni sa odredjenim usernameom drzi vezbe
exports.getAllSubjectsOfEmployeeExc = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {employeeUsername:req.body.employeeUsername, type:'V'} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta na kojima vezbe drzi "+req.body.employeeUsername
        });
    });
};

// Vracanje svih Zaposlenih koji su na predmetu sa odredjenom sifrom
exports.getAllEmployeesOfSubject = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {subjectId:req.body.subjectId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih zaposlenih na predmetu "+req.body.subjectId
        });
    });
};

// Vracanje svih Zaposlenih koji predaju na predmetu sa odredjenom sifrom
exports.getAllEmployeesOfSubjectLectures = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {subjectId:req.body.subjectId, type:'P'} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih zaposlenih koji predaju na predmetu "+req.body.subjectId
        });
    });
};

// Vracanje svih Zaposlenih koji drze vezbe na predmetu sa odredjenom sifrom
exports.getAllEmployeesOfSubjectExc = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {subjectId:req.body.subjectId, type:'V'} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih zaposlenih koji drze vezbe na predmetu "+req.body.subjectId
        });
    });
};

// Vracanje svih tipova i grupa odredjenog predmeta na kojima radi odredjeni zaposleni
exports.getAllTG = (req, res) => {
    SubjectEmployeeLists.findAll({ where: {employeeUsername:req.body.employeeUsername, subjectId:req.body.subjectId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja tipova i grupa predmeta " + req.body.subjectId + "na kojima radi zaposleni"+req.body.employeeUsername
        });
    });
};

// Brisanje svih unosa na osnovu sifre predmeta
exports.deleteBySubject = (req, res) => {
    const subjectId = req.params.subjectId;
  
    SubjectEmployeeLists.destroy({
      where: { subjectId: subjectId }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Angazovanje je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje angazovanja za predmet sa sifrom ${subjectId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja angazovanja za predmet sa sifrom " + subjectId
        });
      });
  };

// Brisanje svih unosa na osnovu usernamea zaposlenog
exports.deleteByEmployee = (req, res) => {
    const employeeUsername = req.params.employeeUsername;
    SubjectEmployeeLists.destroy({
      where: { employeeUsername: employeeUsername }
    })
      .then(num => {
        if (num > 0) {
          res.send({
            message: "Angazovanje je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje angazovanja za zaposlenog ${employeeUsername}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja angazovanja za zaposlenog " + employeeUsername
        });
      });
  };

// Brisanje svih angazovanja
exports.deleteAll = (req, res) => {
    SubjectEmployeeLists.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisana sva angazovanja. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih angazovanja!"
        });
      });
  };