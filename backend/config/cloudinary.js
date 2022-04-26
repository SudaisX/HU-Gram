import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'HUGram',
    allowedFormats: ['jpeg', 'png', 'jpg'],
});

export { cloudinary, storage };
