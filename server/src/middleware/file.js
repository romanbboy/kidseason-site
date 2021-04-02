const multer = require('multer');
const path = require('path');
const {slugify} = require('transliteration');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../../files/documents'))
  },
  filename(req, file, cb) {
    cb(null, slugify(file.originalname, { lowercase: false, separator: '_' }))
  }
});

module.exports = multer({
  storage
})