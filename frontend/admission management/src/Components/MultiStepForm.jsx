import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux"; // Add this import
import { useNavigate } from "react-router-dom"; // Add this import

import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import EducationDetails from "./EducationDetails";
import PhotoSign from "./PhotoSign";
import Documents from "./Documents";
import Confirmation from "./Confirmation";
import Payment from "./Payment";

const FORM_STORAGE_KEY = "multiStepFormData";

const MultiStepForm = () => {
  const formData = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentFormStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const formikRef = useRef();

  const steps = [
    { number: 1, label: "Personal Details", component: PersonalDetails },
    { number: 2, label: "Address", component: AddressDetails },
    { number: 3, label: "Education", component: EducationDetails },
    { number: 4, label: "Photo & Sign", component: PhotoSign },
    { number: 5, label: "Documents", component: Documents },
    { number: 6, label: "Confirmation", component: Confirmation },
    { number: 7, label: "Payment", component: Payment },
    { number: 8, label: "ID", component: PersonalDetails },
  ];

  const getInitialValues = () => {
    const savedFormData = localStorage.getItem(FORM_STORAGE_KEY);

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        if (parsedData.dateOfBirth) {
          parsedData.dateOfBirth = new Date(parsedData.dateOfBirth);
        }
        return parsedData;
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }

    return {
      name: "",
      fathersName: "",
      gender: "",
      category: "",
      dateOfBirth: "",
      phone: "",
      fathersPhone: "",
      emailId: "",
      jeeRollNo: "",
      jeeRank: "",

      permanentAddress: "",
      permanentState: "",
      permanentDistrict: "",
      permanentPin: "",
      currentAddress: "",
      currentState: "",
      currentDistrict: "",
      currentPin: "",

      class10School: "",
      class10Board: "",
      class10Percentage: "",
      class10TotalMarks: "",
      class12School: "",
      class12Board: "",
      class12Percentage: "",
      class12TotalMarks: "",
      class12PCMPercentage: "",
      class12PhysicsMarks: "",
      class12ChemistryMarks: "",
      class12MathMarks: "",
      class12Subject4: "",
      class12Subject4Marks: "",
      class12Subject5: "",
      class12Subject5Marks: "",

      photo: null,
      signature: null,

      jeeAdmitCard: null,
      jeeResult: null,
      registrationSlip: null,
      allotmentLetter: null,
      academicFeeReceipt: null,
      balanceFeeReceipt: null,
      tenthCertificate: null,
      twelfthCertificate: null,
      casteCertificate: null,
      medicalFitness: null,
      characterCertificate: null,
      photographs: null,
      gapYearUndertaking: null,
      antiRaggingStudent: null,
      antiRaggingParent: null,
      attendanceStudent: null,
      attendanceParent: null,

      paymentMethod: "",
      cardNumber: "",
    };
  };

  useEffect(() => {
    localStorage.setItem("currentFormStep", currentStep.toString());
  }, [currentStep]);

  // Debounced storage update
  useEffect(() => {
    let timeoutId;
    const saveFormData = () => {
      const formik = formikRef.current;
      if (formik) {
        const valuesToSave = { ...formik.values };
        Object.keys(valuesToSave).forEach((key) => {
          if (valuesToSave[key] instanceof File) {
            valuesToSave[key] = {
              name: valuesToSave[key].name,
              size: valuesToSave[key].size,
              type: valuesToSave[key].type,
              lastModified: valuesToSave[key].lastModified,
            };
          }
        });
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(valuesToSave));
      }
    };

    timeoutId = setTimeout(saveFormData, 2000); // Save every 2 seconds instead of 1
    return () => clearTimeout(timeoutId);
  }, []);

  const validationSchema = [
    Yup.object({
      // Step 1: Personal Details
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Name is required"),
      fathersName: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Father's name is required"),
      gender: Yup.string().required("Please select a gender"),
      category: Yup.string()
        .oneOf(["general", "sc", "st", "obc", "other"], "Invalid category")
        .required("Category is required"),
      dateOfBirth: Yup.date().required("Date of birth is required"),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid Phone No.")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be at most 10 digits")
        .required("Phone number is required"),
      fathersPhone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid Phone No.")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be at most 10 digits")
        .required("Father's phone number is required"),
      emailId: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      jeeRollNo: Yup.string()
        .matches(/^[0-9]+$/, "JEE Roll number must contain only digits")
        .required("JEE Roll number is required"),
      jeeRank: Yup.number()
        .typeError("Rank must be a number")
        .positive("Rank must be positive")
        .integer("Rank must be an integer")
        .required("JEE Rank is required"),
    }),

    Yup.object({
      permanentAddress: Yup.string()
        .required("Permanent Address is required")
        .max(255, "Address cannot exceed 255 characters"),
      permanentState: Yup.string()
        .required("Permanent State is required")
        .max(100, "State cannot exceed 100 characters"),
      permanentDistrict: Yup.string()
        .required("Permanent District is required")
        .max(100, "District cannot exceed 100 characters"),
      permanentPin: Yup.string()
        .required("Permanent Pin is required")
        .matches(/^\d{6}$/, "Pin must be a 6-digit number"),
      currentAddress: Yup.string()
        .required("Current Address is required")
        .max(255, "Address cannot exceed 255 characters"),
      currentState: Yup.string()
        .required("Current State is required")
        .max(100, "State cannot exceed 100 characters"),
      currentDistrict: Yup.string()
        .required("Current District is required")
        .max(100, "District cannot exceed 100 characters"),
      currentPin: Yup.string()
        .required("Current Pin is required")
        .matches(/^\d{6}$/, "Pin must be a 6-digit number"),
    }),

    Yup.object({
      // Class 10 Fields
      class10School: Yup.string()
        .required("Class 10 School is required")
        .max(255, "School name cannot exceed 255 characters"),
      class10Board: Yup.string().required("Class 10 Board is required"),
      class10Percentage: Yup.number()
        .required("Class 10 Percentage is required")
        .min(0, "Percentage cannot be less than 0")
        .max(100, "Percentage cannot exceed 100"),
      class10TotalMarks: Yup.number()
        .required("Class 10 Total Marks are required")
        .min(0, "Marks cannot be less than 0"),

      // Class 12 Fields
      class12School: Yup.string()
        .required("Class 12 School is required")
        .max(255, "School name cannot exceed 255 characters"),
      class12Board: Yup.string().required("Class 12 Board is required"),
      class12Percentage: Yup.number()
        .required("Class 12 Percentage is required")
        .min(0, "Percentage cannot be less than 0")
        .max(100, "Percentage cannot exceed 100"),
      class12TotalMarks: Yup.number()
        .required("Class 12 Total Marks are required")
        .min(0, "Marks cannot be less than 0"),
      class12PCMPercentage: Yup.number()
        .required("PCM Percentage is required")
        .min(0, "Percentage cannot be less than 0")
        .max(100, "Percentage cannot exceed 100"),
      class12PhysicsMarks: Yup.number()
        .required("Marks in Physics are required")
        .min(0, "Marks cannot be less than 0")
        .max(100, "Marks cannot exceed 100"),
      class12ChemistryMarks: Yup.number()
        .required("Marks in Chemistry are required")
        .min(0, "Marks cannot be less than 0")
        .max(100, "Marks cannot exceed 100"),
      class12MathMarks: Yup.number()
        .required("Marks in Mathematics are required")
        .min(0, "Marks cannot be less than 0")
        .max(100, "Marks cannot exceed 100"),
      class12Subject4: Yup.string()
        .required("Subject 4 is required")
        .max(255, "Subject name cannot exceed 255 characters"),
      class12Subject4Marks: Yup.number()
        .required("Marks in Subject 4 are required")
        .min(0, "Marks cannot be less than 0")
        .max(100, "Marks cannot exceed 100"),
      class12Subject5: Yup.string()
        .required("Subject 5 is required")
        .max(255, "Subject name cannot exceed 255 characters"),
      class12Subject5Marks: Yup.number()
        .required("Marks in Subject 5 are required")
        .min(0, "Marks cannot be less than 0")
        .max(100, "Marks cannot exceed 100"),
    }),

    // Step 4 validation (Photo & Sign)
    Yup.object({
      photo: Yup.mixed().required("Photo is required"),
      signature: Yup.mixed().required("Signature is required"),
    }),

    // Step 5 validation (Documents)
    Yup.object({
      jeeAdmitCard: Yup.mixed().required("JEE Admit Card is required"),
      jeeResult: Yup.mixed().required("JEE Result is required"),
      registrationSlip: Yup.mixed().required("Registration Slip is required"),
      allotmentLetter: Yup.mixed().required("Allotment Letter is required"),
      academicFeeReceipt: Yup.mixed().required(
        "Academic Fee Receipt is required"
      ),
      balanceFeeReceipt: Yup.mixed().required(
        "Balance Fee Receipt is required"
      ),
      tenthCertificate: Yup.mixed().required("10th Certificate is required"),
      twelfthCertificate: Yup.mixed().required("12th Certificate is required"),
      medicalFitness: Yup.mixed().required(
        "Medical Fitness Certificate is required"
      ),
      characterCertificate: Yup.mixed().required(
        "Character Certificate is required"
      ),
      photographs: Yup.mixed().required("Photographs are required"),
      antiRaggingStudent: Yup.mixed().required(
        "Anti-Ragging Undertaking (student) is required"
      ),
      antiRaggingParent: Yup.mixed().required(
        "Anti-Ragging Undertaking (parent) is required"
      ),
      attendanceStudent: Yup.mixed().required(
        "Attendance Undertaking (student) is required"
      ),
      attendanceParent: Yup.mixed().required(
        "Attendance Undertaking (parent) is required"
      ),
    }),

    // Add validation schemas for steps 6, 7, and 8
    Yup.object({}), // Confirmation form
    Yup.object({}), // Payment form
    Yup.object({}), // ID form
  ];

  // First, modify the handleSubmit function to ensure it only runs on step 6
  const handleSubmit = async (values) => {
    if (currentStep !== 6) return;

    try {
      const formDataToSend = new FormData();
      
      // Process regular fields and files in separate loops for better performance
      const fileFields = new Set(['photo', 'signature', 'jeeAdmitCard', 'jeeResult', 'registrationSlip', 
        'allotmentLetter', 'academicFeeReceipt', 'balanceFeeReceipt', 'tenthCertificate', 
        'twelfthCertificate', 'casteCertificate', 'medicalFitness', 'characterCertificate', 
        'photographs', 'gapYearUndertaking', 'antiRaggingStudent', 'antiRaggingParent', 
        'attendanceStudent', 'attendanceParent']);

      // Handle regular fields
      Object.keys(values).forEach(key => {
        if (!fileFields.has(key)) {
          if (key === 'dateOfBirth' && values[key]) {
            formDataToSend.append(key, values[key].toISOString());
          } else if (values[key] != null) { // Only append non-null values
            formDataToSend.append(key, values[key]);
          }
        }
      });

      // Handle file fields
      fileFields.forEach(key => {
        if (values[key] instanceof File) {
          if (key === 'photo' || key === 'signature') {
            formDataToSend.append(key, values[key]);
          } else {
            formDataToSend.append(`documents.${key}`, values[key]);
          }
        }
      });

      const response = await fetch("http://localhost:8000/api/v1/form/submit", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      
      // Move to payment step and clear data
      handleStepChange(7, formikRef.current.validateForm, formikRef.current.setTouched);
      localStorage.removeItem(FORM_STORAGE_KEY);
      localStorage.removeItem("currentFormStep");
      navigate("/payment");
      
    } catch (error) {
      console.error("Form processing error:", error);
      setSubmitError(error.message || "Error processing form data. Please try again.");
    }
  };

  const handleStepChange = useCallback(
    async (step, validateForm, setTouched) => {
      if (step > currentStep) {
        // Only validate the current step's fields
        const currentFields =
          Object.keys(validationSchema[currentStep - 1].fields || {});
        const errors = await validateForm();
        const currentErrors = Object.keys(errors).filter((key) =>
          currentFields.includes(key)
        );

        if (currentErrors.length === 0) {
          setCurrentStep(step);
        } else {
          setTouched(
            currentErrors.reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {})
          );
        }
      } else {
        setCurrentStep(step);
      }
    },
    [currentStep, validationSchema]
  );

  const nextStep = useCallback(
    async (validateForm, setTouched) => {
      if (currentStep < steps.length) {
        handleStepChange(currentStep + 1, validateForm, setTouched);
      }
    },
    [currentStep, steps.length, handleStepChange]
  );

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const StepComponent = steps[currentStep - 1].component;

  return (
    <Formik
      innerRef={formikRef}
      initialValues={getInitialValues()}
      validationSchema={validationSchema[currentStep - 1]}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => (
        <Form className="min-h-screen bg-gray-50 pb-10">
          {/* Desktop and Tablet Step Circles */}
          <div className="hidden md:flex flex-col items-center w-full px-4 sm:px-6 lg:px-0 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto pt-8 font-satoshi">
            <div className="flex items-center w-full">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center relative">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition duration-300
              ${
                step.number < currentStep
                  ? "bg-orange-400 text-white"
                  : currentStep === step.number
                  ? "bg-orange-400 text-white"
                  : "bg-white text-black border border-gray-300"
              }
            `}
                      onClick={() =>
                        handleStepChange(
                          step.number,
                          formikProps.validateForm,
                          formikProps.setTouched
                        )
                      }
                    >
                      <span className="text-lg sm:text-xl md:text-2xl font-medium">
                        {step.number}
                      </span>
                    </div>
                    <span
                      className={`text-xs mt-2 text-center sm:text-sm ${
                        step.number <= currentStep
                          ? "text-orange-400"
                          : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-[1px] relative -top-[28px] sm:-top-[32px] md:-top-[15px]
              ${step.number <= currentStep ? "bg-orange-400" : "bg-gray-300"}
            `}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Mobile Step Indicator */}
          <div className="md:hidden sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
            <h2 className="text-lg sm:text-xl font-medium text-center text-orange-400">
              Step {currentStep}: {steps[currentStep - 1].label}
            </h2>
            <div className="w-full bg-gray-200 h-2 mt-3 rounded-full">
              <div
                className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
          {/* Form Content */}
          <div className="px-4 sm:px-6 lg:px-0 max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
            <StepComponent {...formikProps} />
          </div>
          {/* Navigation Buttons */}
          <div className="mt-8 px-4 sm:px-6 lg:px-0 max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto mb-10">
            <div
              className={`flex ${
                currentStep === 1 ? "justify-center" : "justify-between"
              }`}
            >
              {currentStep !== 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 sm:px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              {currentStep === 6 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 sm:px-6 py-2.5 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-200"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    nextStep(formikProps.validateForm, formikProps.setTouched)
                  }
                  className="px-4 sm:px-6 py-2.5 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-200"
                >
                  Next
                </button>
              )}
            </div>

            {submitError && (
              <div className="mt-4 text-center text-red-600">{submitError}</div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
