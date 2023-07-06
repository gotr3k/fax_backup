const db = require("../models");
const SubjectNoticeFiles = db.subjectNoticeFiles;
const Op = db.Sequelize.Op;
const multer=require('multer');
const uuid=require('uuid').v4;
const path=require('path');
    
exports.create = (req, res) => {
    return res.json({status:'OK'});
};

exports.getByNoticeId=(req,res)=>{
    const subjectNoticeId=req.body.subjectNoticeId;
    SubjectNoticeFiles.findAll({ where: {subjectNoticeId: subjectNoticeId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih fajlova za predmetno obavestenje " + subjectNoticeId
        });
    });
}

exports.download=(req,res)=>{
    const file='./uploads/'+req.query.filePath;
    res.download(file);
}

//brisanje na osnovu id-ja obavestenja
exports.deleteByNoticeId = (req, res) => {
  const id=req.params.id;
  SubjectNoticeFiles.destroy({
    where: { subjectNoticeId:id }
  })
    .then(num => {
      if (num >0) {
        res.send({
          message: "Fajlovi predmetnog obavestenja su uspesno obrisani! Broj obrisanih="+num
        });
      } else {
        res.send({
          message: `Nije moguce brisanje fajlova predmetnog obavestenja sa id-jem ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Greska prilikom brisanja fajlova predmetnog obavestenja sa id-jem" + id
      });
    });
};

// Brisanje fajla na osnovu id reda
exports.delete = (req, res) => {
    const id=req.params.id;
    SubjectNoticeFiles.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Fajl predmetnog obavestenja je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje fajla predmetnog obavestenja ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja fajla predmetnog obavestenja" + id
        });
      });
  };

  // Brisanje svih unosa iz tabele fajlova predemtnih obavestenja - dodati da se obrisu i sa diska
exports.deleteAll = (req, res) => {
  SubjectNoticeFiles.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Uspesno su obrisani svi fajlovi vezani za predmetna obavestenja. Broj obrisanih: ${nums}` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Doslo je do greske prilikom brisanja svih predmetnih obavestenja!"
      });
    });
};