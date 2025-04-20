import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../redux/formSlice";
import TextInput from "./formComponents/TextInput";
import RadioGroup from "./formComponents/RadioGroup";
import SelectField from "./formComponents/SelectField";

const PersonalDetails = (formikProps) => {
  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  const dispatch = useDispatch();

  // Update Redux store whenever form values change
  useEffect(() => {
    dispatch(
      updateFormData({
        section: "personal",
        data: values,
      })
    );
  }, [values, dispatch]);

  return (
    <div className="px-4 py-6 space-y-6 md:space-y-0 md:mt-5 max-w-md md:max-w-5xl mx-auto md:grid md:grid-cols-2 md:gap-x-[200px] md:gap-y-[50px] font-satoshi">
      {/* Left Column */}
      <div className="space-y-6">
        <TextInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          required
        />

        <RadioGroup
          label="Gender"
          name="gender"
          options={[
            { value: "male", label: "Male", bordered: true },
            { value: "female", label: "Female", bordered: true },
          ]}
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.gender && errors.gender}
          required
        />

        <TextInput
          label="Date of birth"
          name="dateOfBirth"
          type="date"
          value={values.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dateOfBirth && errors.dateOfBirth}
          required
        />

        <TextInput
          label="Father's Phone no."
          name="fathersPhone"
          type="tel"
          placeholder="Enter father's phone number"
          value={values.fathersPhone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fathersPhone && errors.fathersPhone}
          required
        />

        <TextInput
          label="JEE Roll no."
          name="jeeRollNo"
          type="text"
          placeholder="Enter JEE Roll number"
          value={values.jeeRollNo || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.jeeRollNo && errors.jeeRollNo}
          required
        />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <TextInput
          label="Father's Name"
          name="fathersName"
          type="text"
          placeholder="Enter father's name"
          value={values.fathersName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fathersName && errors.fathersName}
          required
        />

        <SelectField
          label="Category"
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.category && errors.category}
          required
          className="w-full"
        >
          <option value="">Select Category</option>
          <option value="general">General</option>
          <option value="sc">SC</option>
          <option value="st">ST</option>
          <option value="obc">OBC</option>
          <option value="other">Other</option>
        </SelectField>

        <TextInput
          label="Phone no."
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone}
          required
        />

        <TextInput
          label="Email ID"
          name="emailId"
          type="email"
          placeholder="Enter your email address"
          value={values.emailId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.emailId && errors.emailId}
          required
        />

        <TextInput
          label="JEE Rank"
          name="jeeRank"
          type="number"
          placeholder="Enter JEE Rank"
          value={values.jeeRank || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.jeeRank && errors.jeeRank}
          required
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
