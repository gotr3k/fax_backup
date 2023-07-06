
const db = require("../models");
const Subjects = db.subjects;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog Predmeta
exports.create = (req, res) => {
    // Provera neophodnih polja
    if (!req.body.code || !req.body.name || !req.body.department || !req.body.semester || !req.body.espb || !req.body.type) {
      res.status(400).send({
        message: "Polje ne može biti prazno!"
      });
      return;
    }
  
    // Kreiranje Predmeta
    const subject = {
      code: req.body.code,
      name: req.body.name,
      department: req.body.department,
      semester: req.body.semester,
      espb:req.body.espb,
      type:req.body.type,
      lectures:req.body.lectures,
      exc:req.body.exc,
      lab:req.body.lab,
      goal:req.body.goal,
      result:req.body.result,
      lectureWhen:req.body.lectureWhen,
      excWhen:req.body.excWhen,
      comment:req.body.comment,
      examVisible: req.body.examVisible,
      labVisible: req.body.labVisible,
      projectVisible:req.body.projectVisible
    };

    //Trazenje u bazi da li postoji predmet sa istom sifrom na istom odseku
    Subjects.findAll({ where: {code: req.body.code, department: req.body.department} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        Subjects.create(subject)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog predmeta!"
          });
        });
      } else {
        res.status(400).send({
          message: `Predmet sa sifrom ${req.body.code} već postoji na odseku ${req.body.department}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greška prilikom pretrage tabele predmeta za sifrom " + req.body.code + " na odseku " + req.body.department
      });
    });
  };

// Vracanje svih Predmeta iz baze
exports.findAll = (req, res) => {
  Subjects.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih predmeta iz tabele predmeta!"
      });
    });
};

// Vracanje svih Predmeta iz baze sa RTI odseka
exports.findAllRTI = (req, res) => {
    Subjects.findAll({ where: {department: 1} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih RTI predmeta iz tabele predmeta!"
        });
    });
};

// Vracanje svih Predmeta iz baze sa SI odseka
exports.findAllSI = (req, res) => {
    Subjects.findAll({ where: {department: 2} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih SI predmeta iz tabele predmeta!"
        });
    });
};

// Vracanje svih Predmeta iz baze sa ostalih odseka
exports.findAllOstali = (req, res) => {
    Subjects.findAll({ where: {department: 3} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta sa ostalih odseka iz tabele predmeta!"
        });
    });
};

// Vracanje svih Predmeta iz baze sa master studija
exports.findAllMaster = (req, res) => {
  Subjects.findAll({ where: {department: 4} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih predmeta sa mastera iz tabele predmeta!"
      });
  });
};

// Vracanje svih Predmeta iz odredjenog semestra
exports.findAllSemester = (req, res) => {
    const semester=req.body.semester;
    Subjects.findAll({ where: {semester:semester} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta iz " +semester+". semestra"
        });
    });
};

// Vracanje svih Predmeta iz baze sa odredjenog odseka i iz odredjenog semestra
exports.findAllDepartmentSemester = (req, res) => {
    const department=req.body.department;
    const semester=req.body.semester;
    Subjects.findAll({ where: {department: department, semester:semester} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih predmeta sa odseka " + department + " " +semester+". semestra"
        });
    });
};

// Vracanje jednog Predmeta na osnovu id-ja
exports.getSubject = (req, res) => {
    const id = req.params.id;
    Subjects.findOne({where: {id:id}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja predmeta sa sifrom " + code
        });
      });
  };

  //Vracanje jednog predmeta na osnovu koda i odseka
  exports.check = (req, res) => {
    const code = req.body.code;
    const department=req.body.department;
    Subjects.findOne({where: {code:code, department:department}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja studenta sa korisnickim imenom " + username
        });
      });
  };

// Azuriranje Predmeta na osnovu id-ja
exports.update = (req, res) => {
    const id = req.body.id;
    Subjects.update(req.body, {
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Predmet je azuriran."
          });
        } else {
          res.send({
            message: `Nije moguce azurirati predmet sa id-jem ${id}. Predmet ne postoji ili je body bilo prazno!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom azuriranja predmeta sa id-jem " + id
        });
      });
  };

// Brisanje Predmeta na osnovu id-ja
exports.delete = (req, res) => {
    const id=req.params.id;
    Subjects.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Predmet je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje predmeta sa id-jem ${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja predmeta sa id-jem " + id
        });
      });
  };

// Brisanje svih Predmeta iz baze
exports.deleteAll = (req, res) => {
    Subjects.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisani svi predmeti. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih predmeta!"
        });
      });
  };