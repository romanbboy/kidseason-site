const {Router} = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

router.post('/', fileMiddleware.single('file'), async (req, res) => {
  if(!req.file){
    res.send({
      success: false,
      message: 'Какой то косяк с файлом'
    });
  } else {
    const extImg = ['png', 'jpg', 'jpeg'];
    const extFile = req.file.filename.split('.').pop();

    let pathFile;

    // Если картинка то:
    if (extImg.includes(extFile)) {
      const pathTmpImg = path.resolve(__dirname, `../../files/documents/${req.file.filename}`)
      const file = sharp(pathTmpImg);

      let metadata = await file.metadata();
      
      // Сжимаем изображение временного файла
      let nameImg = req.file.filename.replace(/\.[^.]+$/, "");
      let datePostfix = +Date.now();
      let pathImg = path.resolve(__dirname, `../../files/documents/${nameImg}_${datePostfix}.${metadata.format}`);

      await file
        .toFormat(metadata.format, {quality: 70})
        .toFile(pathImg)
        .then(() => pathFile = `/files/documents/${nameImg}_${datePostfix}.${metadata.format}`)
        .catch(() => console.log('-----> ', 'Не удалось сохранить изображение'))

      // Удаляем временный файл
      fs.unlink(pathTmpImg, (err) => {
        if (err) console.log('-----> ', 'Не удалилось временное изображение');
      });
    }
    else pathFile = `/files/documents/${req.file.filename}`;

    
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
  }
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
    let realPathFile = path.resolve(__dirname, `../..${document.path}`);

    fs.stat(realPathFile, function(err, stats) {
      if (err) console.log("Файл не найден");
      else fs.unlinkSync(realPathFile);
    });
    document.remove({ _id: req.params.id }, err => {
      if (err) res.send({success: false, message: `Не получилось удалить. Ошибка: ${err.code}`});
      else res.send({success: true, message: `Удалили`});
    })
  });
});

module.exports = router;