const {Router} = require('express');
const Category = require('../models/category-model');

const router = Router();

router.get('/', (req, res) => {
  Category.find({}, '', (err, categories) => {
    if (err) res.sendStatus(500);
    else res.send({ categories })
  });
});

router.post('/', (req, res) => {
  const category = new Category({
    name: req.body.name,
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

module.exports = router;