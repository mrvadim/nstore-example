const multer = require("multer");

const STORAGE = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `static/${req.body.type}/`);
  },
  filename: function(req, file, cb) {
    const EXT = file.mimetype.split("/")[1];
    cb(null, `${req.body.type}_${req.body.id}_${Date.now()}.${EXT}`);
  }
});
function fileFilter(req, file, cb) {
  const ALLOWEDMIME = ["image/jpeg", "image/jpg", "image/png"];
  if (!ALLOWEDMIME.includes(file.mimetype)) {
    cb(new Error("INCORRECT_IMAGE_TYPE"), false);
  } else {
    cb(null, true);
  }
}
const upload = multer({ storage: STORAGE, fileFilter }).single("file");

module.exports = {
  uploadFile: (req, res) => {
    upload(req, res, function(error) {
      if (error) {
        console.error("error:", error.message);
        return res.status(415).json({
          error: error.message,
          message: `error`
        });
      } else {
        return res
          .status(200)
          .json({ message: "upload ok", filename: req.file.filename });
      }
    });
  }
};
