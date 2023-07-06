const db = require("../models");
const Admins = db.admins;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog Admina
exports.create = (req, res) => {
    // Provera neophodnih polja
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        message: "Polje ne može biti prazno!"
      });
      return;
    }
  
    // Kreiranje Admina
    const admin = {
      username : req.body.username,
      password: req.body.password
    };

    //Trazenje u bazi da li postoji admin sa istim usernameom
    Admins.findAll({ where: {username: req.body.username} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        Admins.create(admin)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog administratora!"
          });
        });
      } else {
        res.status(400).send({
          message: `Administrator sa korisncikim imenom ${req.body.username} već postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greška prilikom pretrage tabele administratora za korisčnikim imenom " + req.body.username
      });
    });
  };

// Vracanje svih Admina iz baze
exports.findAll = (req, res) => {

  Admins.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih administratora iz tabele administratora!"
      });
    });
};

// Vracanje jednog Admina na osnovu korisnickog imena i lozinke
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admins.findOne({where: {username: username, password:password}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja administratora sa korisnickim imenom " + username
        });
      });
  };

// Azuriranje Admina na osnovu korisnickog imena
exports.update = (req, res) => {
    const username = req.body.username;
  
    Admins.update(req.body, {
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Administrator je azuriran."
          });
        } else {
          res.send({
            message: `Nije moguce azurirati administratora sa korisncikim imenom ${username}. Administrator ne postoji ili je body bilo prazno!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom azuriranja administratora sa korisnickim imenom " + username
        });
      });
  };

// Brisanje Admina na osnovu korisnickog imena
exports.delete = (req, res) => {
    const username = req.params.username;
  
    Admins.destroy({
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Administrator je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje administratora sa koriscnikim imenom ${username}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja administratora sa korisnickim imenom " + username
        });
      });
  };

// Brisanje svih Administratora iz baze
exports.deleteAll = (req, res) => {
    Admins.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisani svi administratori. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih administratora!"
        });
      });
  };