const multer = require('multer');
const {slugify} = require('transliteration');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'files')
  },
  filename(req, file, cb) {
    cb(null, slugify(file.originalname, { lowercase: false, separator: '_' }))
  }
});

const allowedTypes = ['application/octet-stream', 'application/pdf'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(null, false)
}

module.exports = multer({
  storage, fileFilter
})