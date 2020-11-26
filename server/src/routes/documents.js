const {Router} = require('express');
const fs = require('fs');

const fileMiddleware = require('../middleware/file');

const Document = require('../models/document-model');

const router = Router();

router.get('/:limit?', (req, res) => {
  if(req.params.limit){
    Document
      .find({}, 'id name section path')
      .sort({'_id': -1})
      .limit(+req.params.limit)
      .exec(function(err, documents) {
        if (err) res.sendStatus(500);
        else res.send({ documents })
      });
  } else {
    Document.find({}, 'id name section path', (err, documents) => {
      if (err) res.sendStatus(500);
      else res.send({ documents })
    });
  }
});

router.post('/', fileMiddleware.single('file'), (req, res) => {
  if(!req.file){
    res.send({
      success: false,
      message: 'Какой то косяк с файлом'
    });
    return;
  }
  
  let pathFile = `files/${req.file.filename}`;

  const document = new Document({
    name: req.body.name,
    path: pathFile,
    section: req.body.section
  });

  document.save((err, data) => {
    if (err) console.log(err);
    else {
      res.send({
        success: true,
        message: `Документ успешно добавлен`
      })
    }
  })
});

router.put('/:id', (req, res) => {
  Document.findById(req.params.id, 'name section', (err, document) => {
    let success = true;
    let message = 'cc';

    if (err) {
      res.send({success: false, message: `Код ошибки ${err.code}`});
    } else {
      if (req.body.name) document.name = req.body.name;
      if (req.body.section) document.section = req.body.section;

      document.save(err => {
        if (err) {
          success = false;
          message = `Код ошибки ${err.code}`
        }
        else message = `Документ успешно изменен!`;

        res.send({success, message});
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  Document.findById(req.params.id, 'name path section', (err, document) => {
    fs.stat(document.path, function(err, stats) {
      if (err) console.log("Файл не найден");
      else fs.unlinkSync(document.path);
    });
    document.remove({ _id: req.params.id }, err => {
      if (err) res.send({success: false, message: `Не получилось удалить. Ошибка: ${err.code}`});
      else res.send({success: true, message: `Удалили`});
    })
  });
});

module.exports = router;