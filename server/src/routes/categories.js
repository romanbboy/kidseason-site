const {Router} = require('express');
const {slugify} = require('transliteration');
const Category = require('../models/category-model');
const Document = require('../models/document-model');
const Video = require('../models/video-model');
const Scenario = require('../models/scenario-model');
const Photo = require('../models/photo-model');

const router = Router();

router.get('/', (req, res) => {
  Category.find({}, '', (err, categories) => {
    if (err) res.sendStatus(500);
    else res.send({ categories })
  });
});

router.post('/', (req, res) => {
  const category = new Category({
    name: slugify(req.body.fullName, { lowercase: false, separator: '_' }),
    fullName: req.body.fullName
  });

  category.save((err, data) => {
    let success = true;
    let message = ``;

    if (err) {
      if(err.code === 11000) message = `Ошибка: Такая категория уже существует`;
      else message = `Ошибка: код ошибки ${err.code}`;

      success = false;
    }
    else message = `Категория ${data.fullName} успешно добавлена`;

    res.send({
      success, message
    })
  })
});

router.delete('/:id', async (req, res) => {
  let success = true;
  let message = ``;

  const category = await Category.findById(req.params.id, 'name').exec();

  // ищем по всем разделам, у кто находится в конкретной категории
  // не можем удалить категорию, если в ней кто то есть:
  
  // в документах
  const documents = await Document.find({section: category.name}).exec();
  if (documents.length) message += '-Документы-';

  // в видео
  const videos = await Video.find({section: category.name}).exec();
  if (videos.length) message += '-Видео-';

  // в сценариях
  const scenarios = await Scenario.find({section: category.name}).exec();
  if (scenarios.length) message += '-Сценарии-';

  // в фото
  const photos = await Photo.find({section: category.name}).exec();
  if (photos.length) message += '-Фото-';


  // todo еще нужно будет проверку добавить для методической копилки

  if (message) {
    message = 'Не можем удалить категорию, она есть в: ' + message + '. Перемести в другие категории.';
    success = false;
  } else {
    await category.remove(err => {
      if (err) {
        res.send({
          success: false,
          message: `Не удалось удалить категорию. Код ошибки ${err.code}`
        })
      }
    });

    message = 'Категория успешно удалена';
  }

  res.send({
    success, message
  })
})

module.exports = router;