const db = require("../models");
const moment=require("moment");
const Notices = db.notices;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog obavestenja
exports.create = (req, res) => {
    // Provera podataka
    if (!req.body.category || !req.body.title || !req.body.notice || !req.body.date) {
      res.status(400).send({
        message: "Polje ne moze biti prazno!"
      });
      return;
    }
  
    // Kreiranje obavestenja
    const notice = {
        subjectCode : req.body.subjectCode,
        category: req.body.category,
        title:req.body.title,
        notice: req.body.notice,
        date: req.body.date
    };

    //Trazenje u bazi da li postoji obavestenje sa istim naslovom, kategorijom i datumom
    Notices.findAll({ where: {category: req.body.category, title:req.body.title, date: req.body.date} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        Notices.create(notice)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog obavestenja!"
          });
        });
      } else {
        res.status(400).send({
          message: `Ovakvo obavestenje vec postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom pretrage tabele tabele obavestenja"
      });
    });
};

// Vracanje svih/po kategoriji obavestenja iz baze
exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category ? { category: { [Op.like]: `%${category}%` } } : null;

  Notices.findAll({ where: condition, order:[['date','DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom vracanja svih/po kategoriji obavestenja!"
      });
    });
};

// Vracanje svih/po kategoriji obavestenja iz baze starosti do 3 meseca
exports.findAllPast3Months = (req, res) => {
    const category = req.query.category;
    var condition = category ? { category: { [Op.like]: `%${category}%` },  date: {[Op.gte]: moment().subtract(3,'months').toDate()}} : {date: {[Op.gte]: moment().subtract(3,'months').toDate()}};

    Notices.findAll({ where: condition, order:[['date','DESC']] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih/po kategoriji obavestenja starosti do 3 meseca!"
        });
      });
  };

// Vracanje jednog obavestenja na osnovu naslova, datuma, kategorije
exports.findOne = (req, res) => {
    const title = req.body.title;
    const category = req.body.category;
    const date=req.body.date;
    Notices.findOne({where: {title: title, category:category, date:date}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja obavestenja " + title + " " + category + " " + date 
        });
      });
  };

// Azuriranje obavestenja na osnovu id-a
exports.update = (req, res) => {
    const id=req.body.id
    Notices.update(req.body, {
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Obavestenje je azurirano."
          });
        } else {
          res.send({
            message: `Nije moguce azurirati obavestenje ${id}. Obavestenje ne postoji ili je body bilo prazno!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom azuriranja obavestenja " + id 
        });
      });
  };

// Brisanje obavestenja na osnovu id
exports.delete = (req, res) => {
    const id=req.params.id;
    Notices.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Obavestenje je uspesno obrisano!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje obavestenje ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja obavestenja " + id
        });
      });
  };

// Brisanje svih obavestenja iz baze
exports.deleteAll = (req, res) => {
    Notices.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `Uspesno su obrisana sva obavestenja. Broj obrisanih: ${nums}` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Doslo je do greske prilikom brisanja svih obavestenja!"
        });
      });
  };