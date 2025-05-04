const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/usuarios");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeUnico = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, nomeUnico);
  }
});

const upload = multer({ storage });

module.exports = upload;
