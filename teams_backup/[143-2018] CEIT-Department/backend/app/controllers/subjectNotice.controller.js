const db = require("../models");
const moment=require("moment");
const SubjectNotices = db.subjectNotices;
const Op = db.Sequelize.Op;

// Kreiranje i cuvanje novog obavestenja za predmet
exports.create = (req, res) => {
    // Provera podataka
    if (!req.body.subjectCode || !req.body.title || !req.body.notice || !req.body.date) {
      res.status(400).send({
        message: "Polje ne moze biti prazno!"
      });
      return;
    }
  
    // Kreiranje obavestenja
    const subjectNotice = {
        subjectCode : req.body.subjectCode,
        title:req.body.title,
        notice: req.body.notice,
        date: req.body.date
    };

    //Trazenje u bazi da li postoji obavestenje sa istim naslovom, kategorijom i datumom 
    SubjectNotices.findAll({ where: {subjectCode: req.body.subjectCode, title:req.body.title, date: req.body.date} })
    .then(num => {
      if (num == 0) { //Ako ne postoji onda ga kreiramo
        SubjectNotices.create(subjectNotice)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom kreiranja novog obavestenja za predmet!"
          });
        });
      } else {
        res.status(400).send({
          message: `Ovakvo obavestenje za predmet vec postoji!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Dogodila se greska prilikom pretrage tabele obavestenja o predmetima"
      });
    });
};

// Vracanje svih/po predmetu obavestenja iz baze
exports.findAll = (req, res) => {
  const subjectCode = req.query.subjectCode;
  var condition = subjectCode ? { subjectCode: { [Op.like]: `%${subjectCode}%` } } : null;

  SubjectNotices.findAll({ where: condition, order:[['date','DESC']] })
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
exports.findAllPast7Days = (req, res) => {
    const subjectCode = req.query.subjectCode;
    var condition = subjectCode ? { subjectCode: { [Op.like]: `%${subjectCode}%` },  date: {[Op.gte]: moment().subtract(7,'days').toDate()}} : {date: {[Op.gte]: moment().subtract(7,'days').toDate()}};

    SubjectNotices.findAll({ where: condition, order:[['date','DESC']] })
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

// Vracanje jednog obavestenja na osnovu naslova, datuma, predmeta
exports.findOne = (req, res) => {
    const title = req.body.title;
    const subjectCode = req.body.subjectCode;
    const date=req.body.date;
    SubjectNotices.findOne({where: {title: title, subjectCode:subjectCode, date:date}})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom vracanja obavestenja " + title + " " + subjectCode + " " + date 
        });
      });
  };

// Azuriranje obavestenja na osnovu id-a
exports.update = (req, res) => {
    const id=req.body.id
    SubjectNotices.update(req.body, {
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
    SubjectNotices.destroy({
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
    SubjectNotices.destroy({
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