import express from 'express';
import FormController from '../controllers/form.controller.js';
import { uploadAll } from '../config/multer.js';
import multer from 'multer';

const formRouter = express.formRouter();

const uploadFields = uploadAll.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'documents.jeeAdmitCard', maxCount: 1 },
  { name: 'documents.jeeResult', maxCount: 1 },
  { name: 'documents.registrationSlip', maxCount: 1 },
  { name: 'documents.allotmentLetter', maxCount: 1 },
  { name: 'documents.academicFeeReceipt', maxCount: 1 },
  { name: 'documents.balanceFeeReceipt', maxCount: 1 },
  { name: 'documents.tenthCertificate', maxCount: 1 },
  { name: 'documents.twelfthCertificate', maxCount: 1 },
  { name: 'documents.casteCertificate', maxCount: 1 },
  { name: 'documents.medicalFitness', maxCount: 1 },
  { name: 'documents.characterCertificate', maxCount: 1 },
  { name: 'documents.photographs', maxCount: 1 },
  { name: 'documents.gapYearUndertaking', maxCount: 1 },
  { name: 'documents.antiRaggingStudent', maxCount: 1 },
  { name: 'documents.antiRaggingParent', maxCount: 1 },
  { name: 'documents.attendanceStudent', maxCount: 1 },
  { name: 'documents.attendanceParent', maxCount: 1 }
]);

formRouter.post('/submit-form', uploadFields, FormController.submitForm);
formRouter.get('/submission/:id', FormController.getSubmission);
formRouter.get('/submissions', FormController.getAllSubmissions);
formRouter.patch('/submission/:id/payment', FormController.updatePaymentStatus);

formRouter.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files uploaded.'
      });
    }
  }
  
  if (error.message.includes('Only')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'File upload error',
    error: error.message
  });
});

export default formRouter;
