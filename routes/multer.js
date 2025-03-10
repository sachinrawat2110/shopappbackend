const multer  = require('multer');

const mystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  const upload = multer({ storage: mystorage })
  module.exports = upload;