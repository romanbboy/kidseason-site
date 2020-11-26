const {Router} = require('express');
const {slugify} = require('transliteration');

const Scenario = require('../models/scenario-model');

const router = Router();

router.get('/:limit?', (req, res) => {
  if(req.params.limit){
    Scenario
      .find({}, 'id name sign section content')
      .sort({'_id': -1})
      .limit(+req.params.limit)
      .exec(function(err, scenarios) {
        if (err) res.sendStatus(500);
        else res.send({ scenarios })
      });
  } else {
    Scenario.find({}, 'id name sign section content', (err, scenarios) => {
      if (err) res.sendStatus(500);
      else res.send({ scenarios })
    });
  }
});

router.post('/', (req, res) => {
  const scenario = new Scenario({
    name: req.body.name,
    sign: slugify(req.body.name, { lowercase: false, separator: '_' }),
    section: req.body.section,
    content: req.body.content
  });

  scenario.save((err, data) => {
    let success = true;
    let message = ``;

    if (err) {
      message = `Ошибка: код ошибки ${err.code}`;
      success = false;
    }
    else message = `Сценарий успешно добавлен`;

    res.send({success, message});
  })
});

router.put('/:id', (req, res) => {
  Scenario.findById(req.params.id, 'name section content', (err, scenario) => {
    let success = true;
    let message = '';

    if (err) {
      res.send({success: false, message: `Код ошибки ${err.code}`});
    } else {
      if (req.body.name){
        scenario.name = req.body.name;
        scenario.sign = slugify(req.body.name, { lowercase: false, separator: '_' })
      }
      if (req.body.section) scenario.section = req.body.section;
      if (req.body.content) scenario.content = req.body.content;

      scenario.save(err => {
        if (err) {
          success = false;
          message = `Код ошибки ${err.code}`
        }
        else message = `Сценарий успешно изменен!`;

        res.send({success, message});
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  Scenario.remove({ _id: req.params.id }, err => {
    if (err) res.send({success: false, message: `Не получилось удалить. Ошибка: ${err.code}`});
    else res.send({success: true, message: `Удалили`});
  })
});

module.exports = router;