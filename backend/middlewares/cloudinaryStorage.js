import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { cloudinary } from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Qloo',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

export default upload;