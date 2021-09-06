const {Router} = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp')

const fileMiddleware = require('../middleware/multerPhotos');

const Photo = require('../models/photo-model');

const router = Router();

router.get('/:limit?', (req, res) => {
  if(req.params.limit){
    Photo
      .find({}, 'id section path')
      .sort({'_id': -1})
      .limit(+req.params.limit)
      .exec(function(err, photos) {
        if (err) res.sendStatus(500);
        else res.send({ photos })
      });
  } else {
    Photo.find({}, 'id section path', (err, photos) => {
      if (err) res.sendStatus(500);
      else res.send({ photos })
    });
  }
});

router.post('/', fileMiddleware.array('photos[]'), (req, res) => {
  if(!req.files){
    res.send({
      success: false,
      message: 'Какой то косяк с файлами'
    });
  } else {
    req.files.forEach(async (el, i) => {
      let pathFile;
      
      const pathTmpImg = path.resolve(__dirname, `../../files/photos/${el.filename}`)
      const file = sharp(pathTmpImg);

      let metadata = await file.metadata();

      // Сжимаем изображение временного файла
      let nameImg = el.filename.replace(/\.[^.]+$/, "");
      let datePostfix = `${+Date.now()}_${i}`;
      let pathImg = path.resolve(__dirname, `../../files/photos/${nameImg}_${datePostfix}.${metadata.format}`);

      await file
        .toFormat(metadata.format, {quality: 70})
        .toFile(pathImg)
        .then(() => pathFile = `/files/photos/${nameImg}_${datePostfix}.${metadata.format}`)
        .catch(() => console.log('-----> ', 'Не удалось сохранить изображение'))

      // Удаляем временный файл
      fs.unlink(pathTmpImg, (err) => {
        if (err) console.log('-----> ', 'Не удалилось временное изображение');
      });

      const photo = new Photo({
        path: pathFile,
        section: req.body.section
      });

      photo.save((err, data) => {
        if (err) {
          res.send({
            success: false,
            message: err
          });
        }
      })
    });

    res.send({
      success: true,
      message: 'Фото успешно добавлены'
    });
  }
});

router.delete('/:id', (req, res) => {
  Photo.findById(req.params.id, 'path section', (err, photo) => {
    let realPathFile = path.resolve(__dirname, `../..${photo.path}`);

    fs.stat(realPathFile, function(err, stats) {
      if (err) console.log("Файл не найден");
      else fs.unlinkSync(realPathFile);
    });
    photo.remove({ _id: req.params.id }, err => {
      if (err) res.send({success: false, message: `Не получилось удалить. Ошибка: ${err.code}`});
      else res.send({success: true, message: `Удалили`});
    })
  });
});

module.exports = router;