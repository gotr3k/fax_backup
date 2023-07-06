const db = require("../models");
const EmployeeAvatars = db.employeeAvatars;
const Op = db.Sequelize.Op;
const multer=require('multer');
const uuid=require('uuid').v4;
const path=require('path');
    
exports.create = (req, res) => {
    return res.json({status:'OK'});
};

exports.getByEmployeeId=(req,res)=>{
    const employeeId=req.body.employeeId;
    EmployeeAvatars.findOne({ where: {employeeId: employeeId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja avatara za zaposlenog sa id-jem " + employeeId
        });
    });
}

exports.download=(req,res)=>{
    const file='./uploads/'+req.query.filePath;
    res.download(file);
}

exports.display=(req,res)=>{
    const file='./uploads/'+req.query.filePath;
    res.sendFile(file);
}

//brisanje na osnovu id-ja zaposlenog
exports.deleteByEmployeeId = (req, res) => {
  const employeeId=req.params.id;
  EmployeeAvatars.destroy({
    where: { employeeId:employeeId }
  })
    .then(num => {
      if (num >0) {
        res.send({
          message: "Obrisan je avatar zaposlenog " +employeeId
        });
      } else {
        res.send({
          message: `Nije moguce brisanje avatara zaposlenog ${employeeId}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Greska prilikom brisanja avatara zaposlenog " + employeeId
      });
    });
};

// Brisanje avatara na osnovu id reda
exports.delete = (req, res) => {
    const id=req.params.id;
    EmployeeAvatars.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Avatar je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje Avatara ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja Avatara " + id
        });
      });
  };

  // Brisanje svih unosa iz tabele avatara zaposlenih - dodati da se obrisu i sa diska
exports.deleteAll = (req, res) => {
  EmployeeAvatars.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Uspesno su obrisani svi avatari zaposlenih. Broj obrisanih: ${nums}` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Doslo je do greske prilikom brisanja svih avatara zaposlenih!"
      });
    });
};