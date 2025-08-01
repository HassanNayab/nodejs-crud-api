// middleware/upload.js

const multer = require('multer');
const path = require('path');

// File storage location & filename format
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where files are saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Optional: file type filter
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png) are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
