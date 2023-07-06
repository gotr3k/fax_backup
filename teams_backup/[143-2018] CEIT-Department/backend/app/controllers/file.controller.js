const db = require("../models");
const Files = db.files;
const Op = db.Sequelize.Op;
const multer=require('multer');
const uuid=require('uuid').v4;
const path=require('path');
    
exports.create = (req, res) => {
    // Provera podataka
/*     if (!req.body.employeeFullName || !req.body.subjectCode || !req.body.type || !req.body.file) {
      res.status(400).send({
        message: "Polje ne moze biti prazno!"
      });
      return;
    }

    const file=req.body.file;

    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./uploads');
        },
        filename:(req,file,cb)=>{
            const ext=path.extname(file.originalname);
            const id=uuid();
            const filePath=`files/${req.body.subjectCode}/${req.body.type}/${id}${ext}`;
            const fileDB = {
                employeeFullName:req.body.employeeFullName,
                subjectCode : req.body.subjectCode,
                fileName: path.basename(file.originalname),
                filePath: filePath,
                type: req.body.type
            };
            Files.create(fileDB)
            .then(data => {
              cb(null,filePath);
              const upload=multer({storage:storage});
              upload.single('file');
              res.send(data); 
            })
            .catch(err => {
            res.status(500).send({
              message:
                err.message || "Dogodila se greska prilikom uploadovanja novog fajla /" + req.body.subjectCode+ "/"+req.body.type+"/"+id+ext
          });
        });
        }
    }) */
    return res.json({status:'OK'});
};

exports.getBySubjectAndType=(req,res)=>{
    const subjectCode=req.body.subjectCode;
    const type=req.body.type;
    Files.findAll({ where: {subjectCode: subjectCode, type:type} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se greska prilikom vracanja svih fajlova sa predmeta " + subjectCode +" " +type
        });
    });
}

exports.download=(req,res)=>{
    const file='./uploads/'+req.query.filePath;
    res.download(file);
}

// Brisanje fajla na osnovu id
exports.delete = (req, res) => {
    const id=req.params.id;
    Files.destroy({
      where: { id:id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Fajl je uspesno obrisan!"
          });
        } else {
          res.send({
            message: `Nije moguce brisanje fajla ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Greska prilikom brisanja fajla " + id
        });
      });
  };