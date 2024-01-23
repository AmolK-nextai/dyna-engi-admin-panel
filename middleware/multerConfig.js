// multerConfig.js
const multer = require('multer');
const path = require('path');
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Set the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    console.log(req.body.name)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `${req.body.name.replace(/\s/g, '-').toLowerCase()}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
