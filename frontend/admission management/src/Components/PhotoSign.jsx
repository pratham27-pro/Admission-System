import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../redux/formSlice";

const PhotoSign = ({
  nextStep,
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  const dispatch = useDispatch();

  // Update Redux store whenever form values change
  useEffect(() => {
    dispatch(
      updateFormData({
        section: "photoSign",
        data: {
          photo: values.photo,
          signature: values.signature,
        },
      })
    );
  }, [values, dispatch]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFieldTouched(type, true);
        setFieldValue(type, null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(type, {
          file: file.name,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (type) => {
    setFieldValue(type, null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.photo || !values.signature) {
      setFieldTouched("photo", true);
      setFieldTouched("signature", true);
      return;
    }
    nextStep();
  };

  return (
    <div className="bg-white p-6 rounded-lg mt-8 max-w-5xl mx-auto font-satoshi">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Candidate's Photograph</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            {values.photo?.preview ? (
              <div className="flex flex-col items-center ">
                <img
                  src={values.photo.preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mb-4"
                />
                <p className="text-sm text-gray-600 mb-4">
                  {values.photo.file}
                </p>
                <div className="flex gap-4">
                  <label className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "photo")}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile("photo")}
                    className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photo")}
                  className="w-full"
                />
              </div>
            )}
            {touched.photo && errors.photo && (
              <p className="text-red-500 text-sm mt-2">{errors.photo}</p>
            )}
          </div>
        </div>

        {/* Signature Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Candidate's Signature</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            {values.signature?.preview ? (
              <div className="flex flex-col items-center">
                <img
                  src={values.signature.preview}
                  alt="Preview"
                  className="w-64 h-24 object-contain mb-4"
                />
                <p className="text-sm text-gray-600 mb-4">
                  {values.signature.file}
                </p>
                <div className="flex gap-4">
                  <label className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
                    Change Signature
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "signature")}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile("signature")}
                    className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "signature")}
                  className="w-full"
                />
              </div>
            )}
            {touched.signature && errors.signature && (
              <p className="text-red-500 text-sm mt-2">{errors.signature}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhotoSign;
