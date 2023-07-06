const db = require("../models");
const Employees = db.employees;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog Zaposlenog
exports.create = (req, res) => {
    // Provera neophodnih polja
    if (!req.body.username || !req.body.password || !req.body.rank || !req.body.address || !req.body.name || !req.body.surname || !req.body.room) {
      res.status(400).send({
        message: "Polje ne moze biti prazno!"
      });
      return;
    }
  
    // Kreiranje Zaposlenog
    const employee = {
      username : req.body.username,
      password: req.body.password,
      rank: req.body.rank,
      phone: req.body.phone,
      address: req.body.address,
      website: req.body.website,
      biography: req.body.biography,
      room: req.body.room,
      name: req.body.name,
      surname: req.body.surname,
      status: req.body.status
    };

    //Trazenje u bazi da li postoji zaposleni sa istim usernameom
    Employees.findAll({ where: {username: req.body.username} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        Employees.create(employee)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog zaposlenog u tabeli zaposlenih!"
          });
        });
      } else {
        res.status(400).send({
          message: `Zaposleni sa korisncikim imenom ${req.body.username} vec postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom pretrage tabele zaposlenih za koriscnikim imenom " + req.body.username
      });
    });
  };

  //Vracanje jednog zaposlenog osnovu korisnickog imena
  exports.check = (req, res) => {
    const username = req.body.username;
    Employees.findOne({where: {username: username}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja zaposlenog sa korisnickim imenom " + username
        });
      });
  };

// Vracanje svih/aktivnih/neaktivnih Zaposlenih iz baze
exports.findAll = (req, res) => {
  const status = req.query.status;      //PROVERITI DA LI JE QUERY
  var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

  Employees.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih/aktivnih/neaktivnih zaposlenih iz tabele zaposlenih!"
      });
    });
};

// Vracanje jednog Zaposlenog na osnovu korisnickog imena i lozinke
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Employees.findOne({where: {username: username, password:password}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja zaposlenog sa korisnickim imenom " + username
        });
      });
  };

// Azuriranje Zaposlenog na osnovu id-ja
exports.update = (req, res) => {
  const id=req.body.id; 
    Employees.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Zaposleni je azuriran."
          });
        } else {
          res.send({
            message: `Nije moguce azurirati zaposlenog sa id-jem ${id}. Zaposleni ne postoji ili je body bilo prazno!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom azuriranja zaposlenog sa korisnickim imenom " + id
        });
      });
  };

// Brisanje Zaposlenog na osnovu id-ja
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employees.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Zaposleni je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje zaposlenog sa id-jem ${id}. Mozda takav zaposleni ne postoji!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja zaposlenog sa korisnickim imenom " + id
        });
      });
  };

// Brisanje svih Zaposlenih iz baze
exports.deleteAll = (req, res) => {
    Employees.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisani svi zaposleni. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih zaposlenih!"
        });
      });
  };