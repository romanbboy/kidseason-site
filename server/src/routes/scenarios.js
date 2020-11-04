const {Router} = require('express');

const Scenario = require('../models/scenario-model');

const router = Router();

router.post('/', (req, res) => {
  const scenario = new Scenario({
    name: req.body.name,
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

module.exports = router;