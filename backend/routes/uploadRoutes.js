import express from 'express';
import path from 'path';
import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
import { storage, cloudinary } from '../config/cloudinary.js';
const router = express.Router();

const storageLocal = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads');
    },

    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file, callback) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return callback(null, true);
    } else {
        callback('Images only');
    }
}

const uploadLocal = multer({
    storageLocal,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    },
});

const upload = multer({ storage });

router.post('/', uploadLocal.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

router.post('/cloudinary', upload.single('image'), (req, res) => {
    res.send(`${req.file.path}`);
});

export default router;
