const db = require("../models");
const Students = db.students;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog Studenta
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.index || !req.body.type || !req.body.name || !req.body.surname) {
      res.status(400).send({
        message: "Polje ne moze biti prazno!"
      });
      return;
    }
  
    // Kreiranje Studenta
    const student = {
      username : req.body.username,
      password: req.body.password,
      index: req.body.index,
      type: req.body.type,
      name: req.body.name,
      surname: req.body.surname,
      status: req.body.status
    };

    // Cuvanje Studenta u bazi ako ne postoji
    /*Students.create(student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom kreiranja novog studenta u tabeli studenata!"
      });
    });*/

    //Trazenje u bazi da li postoji student sa istim usernameom
    Students.findAll({ where: {username: req.body.username} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        Students.create(student)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog studenta u tabeli studenata!"
          });
        });
      } else {
        res.status(400).send({
          message: `Student sa korisncikim imenom ${req.body.username} vec postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom pretrage tabele studenata za koriscnikim imenom " + req.body.username
      });
    });
  };

// Vracanje svih/aktivnih/neaktivnih Studenata iz baze
exports.findAll = (req, res) => {
  const status = req.query.status;
  var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

  Students.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih/aktivnih/neaktivnih studenata iz tabele studenata!"
      });
    });
};

// Vracanje jednog Studenta na osnovu korisnickog imena i lozinke
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Students.findOne({where: {username: username, password:password}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja studenta sa korisnickim imenom " + username
        });
      });
  };
  
//Vracanje jednog studenta nsa osnovu korisnickog imena
  exports.check = (req, res) => {
    const username = req.body.username;
    Students.findOne({where: {username: username}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja studenta sa korisnickim imenom " + username
        });
      });
  };

// Azuriranje Studenta na osnovu usernamea
exports.update = (req, res) => {
  const id=req.body.id
    Students.update(req.body, {
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student je azuriran."
          });
        } else {
          res.send({
            message: `Nije moguce azurirati studenta sa id-jem ${id}. Student ne postoji ili je body bilo prazno!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom azuriranja studenta sa id-jem " + id
        });
      });
  };

// Brisanje Studenta na osnovu id-ja
exports.delete = (req, res) => {
  const id=req.params.id
  
    Students.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje studenta sa koriscnikim imenom ${id}. Mozda takav student ne postoji!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja studenta sa korisnickim imenom " + id
        });
      });
  };

// Brisanje svih Studenata iz baze
exports.deleteAll = (req, res) => {
    Students.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisani svi studenti. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih studenata!"
        });
      });
  };