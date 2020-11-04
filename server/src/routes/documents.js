const {Router} = require('express');

const fileMiddleware = require('../middleware/file');

const Document = require('../models/document-model');

const router = Router();

router.get('/', (req, res) => {
  Document.find({}, '', (err, documents) => {
    if (err) res.sendStatus(500);
    else res.send({ documents })
  });
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

module.exports = router;