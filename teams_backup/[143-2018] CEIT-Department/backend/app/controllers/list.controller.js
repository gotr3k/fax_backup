const db = require("../models");
const moment=require("moment");
const Lists = db.lists;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog spiska
exports.create = (req, res) => {
    // Provera podataka
    if (!req.body.date || !req.body.time || !req.body.subjectId || !req.body.place || !req.body.name) {
      res.status(400).send({
        message: "Polje ne moze biti prazno!"
      });
      return;
    }
  
    // Kreiranje obavestenja
    const list = {
        date : req.body.date,
        time: req.body.time,
        subjectId:req.body.subjectId,
        slots: req.body.slots,
        place: req.body.place,
        name:req.body.name,
        open:req.body.open
    };

    //Trazenje u bazi da li postoji obavestenje sa istim naslovom, kategorijom i datumom
    Lists.findAll({ where: {date:req.body.date, time:req.body.time, place: req.body.place} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        Lists.create(list)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog spiska!"
          });
        });
      } else {
        res.status(400).send({
          message: `Nije moguce naprati spisak (vrv zbog zauzetosti laboratorije u to vreme!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom pretrage tabele spiskova"
      });
    });
};

// Vracanje svih spiskova iz baze
exports.findAll = (req, res) => {

  Lists.findAll({ where: {}, order:[['date','DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih spiskova!"
      });
    });
};

// Vracanje svih/po kategoriji obavestenja iz baze starosti do 3 meseca
exports.findAllBySubject = (req, res) => {
    const subjectId = req.body.subjectId;

    Lists.findAll({ where: {subjectId:subjectId}, order:[['date','DESC']] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih spiskova za predmet sa id-jem" + subjectId
        });
      });
  };

// Vracanje jednog obavestenja na osnovu naslova, datuma, kategorije
exports.findOpenBySubject = (req, res) => {
    const subjectId = req.body.subjectId;
    Lists.findOne({where: {subjectId:subjectId, open:true}, order:[['date','DESC']] })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja otvorenih spiskovza za predmet sa id-jem " + subjectId
        });
      });
  };

// Azuriranje spiska na osnovu id-a
exports.update = (req, res) => {
    const id=req.body.id
    Lists.update(req.body, {
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Spisak je azuriran."
          });
        } else {
          res.send({
            message: `Nije moguce azurirati spisak ${id}. Spisak ne postoji ili je body bilo prazno!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom azuriranja spiska " + id 
        });
      });
  };

// Brisanje spiska na osnovu id
exports.delete = (req, res) => {
    const id=req.params.id;
    Lists.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Spisak je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje spiska ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja spiska " + id
        });
      });
  };

// Brisanje svih spiskova iz baze
exports.deleteAll = (req, res) => {
    Lists.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisani svi spiskovi. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih spiskova!"
        });
      });
  };