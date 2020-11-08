const {Router} = require('express');

const Video = require('../models/video-model');

const router = Router();

router.get('/', (req, res) => {
  Video.find({}, 'id name section link', (err, videos) => {
    if (err) res.sendStatus(500);
    else res.send({ videos })
  });
});

router.post('/', (req, res) => {
  const video = new Video({
    name: req.body.name,
    section: req.body.section,
    link: req.body.link
  });

  video.save((err, data) => {
    let success = true;
    let message = ``;

    if (err) {
      message = `Ошибка: код ошибки ${err.code}`;
      success = false;
    }
    else message = `Видео успешно добавлено`;

    res.send({success, message});
  })
});

router.put('/:id', (req, res) => {
  Video.findById(req.params.id, 'name section', (err, video) => {
    let success = true;
    let message = '';

    if (err) {
      res.send({success: false, message: `Код ошибки ${err.code}`});
    } else {
      if (req.body.name) video.name = req.body.name;
      if (req.body.section) video.section = req.body.section;

      video.save(err => {
        if (err) {
          success = false;
          message = `Код ошибки ${err.code}`
        }
        else message = `Видео успешно изменено!`;

        res.send({success, message});
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  Video.remove({ _id: req.params.id }, err => {
    if (err) res.send({success: false, message: `Не получилось удалить. Ошибка: ${err.code}`});
    else res.send({success: true, message: `Удалили`});
  })
});

module.exports = router;