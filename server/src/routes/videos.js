const {Router} = require('express');

const Video = require('../models/video-model');

const router = Router();

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

module.exports = router;