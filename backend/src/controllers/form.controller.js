import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';

class FormController {
  async submitForm(req, res) {
    try {
      console.log('Received form submission request');
      console.log('Files:', req.files);
      console.log('Body:', req.body);

      let personalData = {};
      let addressData = {};
      let educationData = {};

      try {
        if (req.body.personal) personalData = JSON.parse(req.body.personal);
        if (req.body.address) addressData = JSON.parse(req.body.address);
        if (req.body.education) educationData = JSON.parse(req.body.education);
      } catch (parseError) {
        console.error('Error parsing form data:', parseError);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid form data format' 
        });
      }

      const fileUrls = {};
      const documentUrls = {};

      if (req.files) {
        req.files.forEach(file => {
          const fieldName = file.fieldname;
          
          if (fieldName === 'photo' || fieldName === 'signature') {
            fileUrls[fieldName] = file.path; // Cloudinary URL
          } else if (fieldName.startsWith('documents.')) {
            const docName = fieldName.replace('documents.', '');
            documentUrls[docName] = file.path; // Cloudinary URL
          }
        });
      }

      // Validate required files
      const requiredFiles = ['photo', 'signature'];
      const requiredDocs = [
        'jeeAdmitCard', 'jeeResult', 'registrationSlip', 'allotmentLetter',
        'academicFeeReceipt', 'balanceFeeReceipt', 'tenthCertificate', 
        'twelfthCertificate', 'medicalFitness', 'characterCertificate',
        'photographs', 'antiRaggingStudent', 'antiRaggingParent',
        'attendanceStudent', 'attendanceParent'
      ];

      for (const file of requiredFiles) {
        if (!fileUrls[file]) {
          return res.status(400).json({
            success: false,
            message: `${file} is required`
          });
        }
      }

      for (const doc of requiredDocs) {
        if (!documentUrls[doc]) {
          return res.status(400).json({
            success: false,
            message: `${doc} document is required`
          });
        }
      }

      const formSubmissionData = {
        ...personalData,
        
        ...addressData,
        
        ...educationData,
        
        photo: fileUrls.photo,
        signature: fileUrls.signature,
        
        documents: documentUrls,
        
        paymentMethod: req.body.paymentMethod || '',
        cardNumber: req.body.cardNumber || '',
        paymentStatus: 'pending'
      };

      const formSubmission = new User(formSubmissionData);
      const savedSubmission = await formSubmission.save();

      console.log('Form submitted successfully:', savedSubmission._id);

      res.status(201).json({
        success: true,
        message: 'Form submitted successfully',
        submissionId: savedSubmission._id,
        data: {
          id: savedSubmission._id,
          name: savedSubmission.name,
          emailId: savedSubmission.emailId,
          submittedAt: savedSubmission.submittedAt
        }
      });

    } catch (error) {
      console.error('Form submission error:', error);
      
      if (req.files) {
        req.files.forEach(async (file) => {
          try {
            const publicId = file.filename || file.public_id;
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          } catch (cleanupError) {
            console.error('Error cleaning up file:', cleanupError);
          }
        });
      }

      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async getSubmission(req, res) {
    try {
      const { id } = req.params;
      const submission = await User.findById(id);

      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Form submission not found'
        });
      }

      res.json({
        success: true,
        data: submission
      });

    } catch (error) {
      console.error('Error fetching submission:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async getAllSubmissions(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const submissions = await User.find()
        .select('name emailId phone jeeRollNo submittedAt paymentStatus')
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await User.countDocuments();

      res.json({
        success: true,
        data: submissions,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: submissions.length,
          totalRecords: total
        }
      });

    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { paymentStatus, paymentMethod, cardNumber } = req.body;

      const submission = await User.findByIdAndUpdate(
        id,
        { 
          paymentStatus,
          paymentMethod: paymentMethod || submission.paymentMethod,
          cardNumber: cardNumber || submission.cardNumber
        },
        { new: true }
      );

      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Form submission not found'
        });
      }

      res.json({
        success: true,
        message: 'Payment status updated successfully',
        data: submission
      });

    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export default new FormController();