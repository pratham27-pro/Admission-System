import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const createCloudinaryStorage = (userName, fileType) => {
  const sanitizedUserName = userName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `form-submissions/${sanitizedUserName}/${fileType}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
      resource_type: 'auto'
    }
  });
};


// Different storage configurations
const photoStorage = createCloudinaryStorage('photos', ['jpg', 'jpeg', 'png']);
const documentStorage = createCloudinaryStorage('documents', ['jpg', 'jpeg', 'png', 'pdf']);

// Multer upload configurations
export const uploadPhoto = multer({ 
  storage: photoStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for photos'), false);
    }
  }
});

export const uploadDocument = multer({ 
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed for documents'), false);
    }
  }
});

// Combined upload for all files
export const uploadAll = multer({
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'), false);
    }
  }
});
