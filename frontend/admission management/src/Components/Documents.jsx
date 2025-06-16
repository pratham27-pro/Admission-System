import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { updateFormData } from "../redux/formSlice";

const fields = [
  { label: "JEE main admit card", name: "jeeAdmitCard", required: true },
  { label: "JEE main Result", name: "jeeResult", required: true },
  { label: "Registration Slip", name: "registrationSlip", required: true },
  { label: "Allotment letter", name: "allotmentLetter", required: true },
  {
    label: "Academic fee receipt (Rs. 96,000)",
    name: "academicFeeReceipt",
    required: true,
  },
  {
    label: "Balance fee receipt (Rs. 75,600)",
    name: "balanceFeeReceipt",
    required: true,
  },
  {
    label: "10th certificate and mark sheet",
    name: "tenthCertificate",
    required: true,
  },
  {
    label: "12th certificate and mark sheet",
    name: "twelfthCertificate",
    required: true,
  },
  {
    label: "Caste and Category Certificate (if any)",
    name: "casteCertificate",
    required: false,
  },
  {
    label: "Medical Fitness certificate (MBBS)",
    name: "medicalFitness",
    required: true,
  },
  {
    label: "Character certificate",
    name: "characterCertificate",
    required: true,
  },
  { label: "Photographs", name: "photographs", required: true },
  {
    label: "Undertaking for Gap year (if applicable)",
    name: "gapYearUndertaking",
    required: false,
  },
  {
    label: "Undertaking for Anti Ragging by students",
    name: "antiRaggingStudent",
    required: true,
  },
  {
    label: "Undertaking for Anti Ragging by parents",
    name: "antiRaggingParent",
    required: true,
  },
  {
    label: "Undertaking for attendance by students",
    name: "attendanceStudent",
    required: true,
  },
  {
    label: "Undertaking for attendance by parents",
    name: "attendanceParent",
    required: true,
  },
];

const Documents = () => {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const [fileErrors, setFileErrors] = useState({});
  const dispatch = useDispatch();

  // Update Redux store whenever form values change
  useEffect(() => {
    dispatch(
      updateFormData({
        section: "documents",
        data: values,
      })
    );
  }, [values, dispatch]);

  const handleFileChange = (name, file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileErrors({
          ...fileErrors,
          [name]: "File size should be less than 5MB",
        });
        return;
      }

      setFieldValue(name, {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      });

      setFileErrors({ ...fileErrors, [name]: null });
    }
  };

  return (
    <div className="p-6 rounded-lg max-w-5xl mx-auto">
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="border rounded-lg p-4">
            <label className="block text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center space-x-4">
              <input
                className="flex-1 text-gray-500 focus:outline-none"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileChange(field.name, e.target.files[0])
                }
              />
              {values[field.name] && (
                <span className="text-green-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {values[field.name].name}
                </span>
              )}
            </div>
            {touched[field.name] && errors[field.name] && (
              <p className="text-red-500 text-sm mt-2">{errors[field.name]}</p>
            )}
            {fileErrors[field.name] && (
              <p className="text-red-500 text-sm mt-2">
                {fileErrors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
