// controllers/uploadController.js

exports.uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  //  You can optionally store this path in product model later
  const filePath = `/uploads/${req.file.filename}`;

  res.status(200).json({
    message: 'Image uploaded successfully',
    file: req.file.filename,
    path: filePath,
  });
};
