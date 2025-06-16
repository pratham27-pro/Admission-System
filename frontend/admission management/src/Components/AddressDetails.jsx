import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../redux/formSlice";
import TextInput from "./formComponents/TextInput";

const AdressDetails = (formikProps) => {
  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  const dispatch = useDispatch();

  // Update Redux store whenever form values change
  useEffect(() => {
    dispatch(
      updateFormData({
        section: "address",
        data: {
          permanent: {
            address: values.permanentAddress,
            state: values.permanentState,
            district: values.permanentDistrict,
            pin: values.permanentPin,
          },
          current: {
            address: values.currentAddress,
            state: values.currentState,
            district: values.currentDistrict,
            pin: values.currentPin,
          },
        },
      })
    );
  }, [values, dispatch]);

  return (
    <div className="px-4 max-w-sm mx-auto md:max-w-5xl md:mx-auto mt-6 font-satoshi">
      {/* Permanent Address Section */}
      <div className="border-b-2 pb-8 md:pb-16 border-gray-300">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Permanent Address
        </h2>
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-[200px] md:gap-y-8">
          <TextInput
            label="Address"
            name="permanentAddress"
            type="text"
            placeholder="Enter your address"
            value={values.permanentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.permanentAddress && errors.permanentAddress}
            required
          />
          <TextInput
            label="State"
            name="permanentState"
            type="text"
            placeholder="Enter your state"
            value={values.permanentState}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.permanentState && errors.permanentState}
            required
          />
          <TextInput
            label="District"
            name="permanentDistrict"
            type="text"
            placeholder="Enter your district"
            value={values.permanentDistrict}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.permanentDistrict && errors.permanentDistrict}
            required
          />
          <TextInput
            label="Pin"
            name="permanentPin"
            type="text"
            placeholder="Enter your pin"
            value={values.permanentPin}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.permanentPin && errors.permanentPin}
            required
          />
        </div>
      </div>

      {/* Current Address Section */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Current Address
        </h2>
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-[200px] md:gap-y-8">
          <TextInput
            label="Address"
            name="currentAddress"
            type="text"
            placeholder="Enter your address"
            value={values.currentAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentAddress && errors.currentAddress}
            required
          />
          <TextInput
            label="State"
            name="currentState"
            type="text"
            placeholder="Enter your state"
            value={values.currentState}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentState && errors.currentState}
            required
          />
          <TextInput
            label="District"
            name="currentDistrict"
            type="text"
            placeholder="Enter your district"
            value={values.currentDistrict}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentDistrict && errors.currentDistrict}
            required
          />
          <TextInput
            label="Pin"
            name="currentPin"
            type="text"
            placeholder="Enter your pin"
            value={values.currentPin}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentPin && errors.currentPin}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AdressDetails;
