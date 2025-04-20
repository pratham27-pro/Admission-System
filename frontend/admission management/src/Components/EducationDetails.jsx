import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../redux/formSlice";
import TextInput from "./formComponents/TextInput";
import SelectField from "./formComponents/SelectField";

const EducationDetails = (formikProps) => {
  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  const dispatch = useDispatch();

  // Update Redux store whenever form values change
  useEffect(() => {
    dispatch(
      updateFormData({
        section: "education",
        data: {
          class10: {
            school: values.class10School,
            board: values.class10Board,
            percentage: values.class10Percentage,
            totalMarks: values.class10TotalMarks,
          },
          class12: {
            school: values.class12School,
            board: values.class12Board,
            percentage: values.class12Percentage,
            totalMarks: values.class12TotalMarks,
            pcmPercentage: values.class12PCMPercentage,
            physicsMarks: values.class12PhysicsMarks,
            chemistryMarks: values.class12ChemistryMarks,
            mathsMarks: values.class12MathMarks,
            subject4: values.class12Subject4,
            subject4Marks: values.class12Subject4Marks,
            subject5: values.class12Subject5,
            subject5Marks: values.class12Subject5Marks,
          },
        },
      })
    );
  }, [values, dispatch]);

  return (
    <div className="space-y-8 px-4 sm:space-y-12 max-w-md sm:max-w-5xl mx-auto mt-6 font-satoshi">
      {/* Class 10 Section */}
      <div className="border-b-2 pb-8 sm:pb-16 border-gray-400">
        <h2 className="text-center text-xl font-semibold mb-6">Class 10</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-[200px]">
          <TextInput
            label="School"
            name="class10School"
            type="text"
            placeholder="Enter your school name"
            value={values.class10School}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class10School && errors.class10School}
            required
          />
          <SelectField
            label="Board"
            name="class10Board"
            value={values.class10Board}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class10Board && errors.class10Board}
            required
            className="w-full"
          >
            <option value="">Pick your school board</option>
            <option value="cbse">CBSE</option>
            <option value="icse">ICSE</option>
            <option value="state">State Board</option>
            <option value="other">Other</option>
          </SelectField>
          <TextInput
            label="Overall Percentage"
            name="class10Percentage"
            type="number"
            placeholder="Enter your percentage"
            value={values.class10Percentage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class10Percentage && errors.class10Percentage}
            required
          />
          <TextInput
            label="Total Marks"
            name="class10TotalMarks"
            type="number"
            placeholder="/500"
            value={values.class10TotalMarks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class10TotalMarks && errors.class10TotalMarks}
            required
          />
        </div>
      </div>

      {/* Class 12 Section */}
      <div className="pt-4 sm:pt-8">
        <h2 className="text-center text-xl font-semibold mb-6">Class 12</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-[200px]">
          <TextInput
            label="School"
            name="class12School"
            type="text"
            placeholder="Enter your school name"
            value={values.class12School}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12School && errors.class12School}
            required
          />
          <SelectField
            label="Board"
            name="class12Board"
            value={values.class12Board}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12Board && errors.class12Board}
            required
            className="w-full"
          >
            <option value="">Pick your school board</option>
            <option value="cbse">CBSE</option>
            <option value="icse">ICSE</option>
            <option value="state">State Board</option>
            <option value="other">Other</option>
          </SelectField>
          <TextInput
            label="Overall Percentage"
            name="class12Percentage"
            type="number"
            placeholder="Enter your percentage"
            value={values.class12Percentage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12Percentage && errors.class12Percentage}
            required
          />
          <TextInput
            label="Total Marks"
            name="class12TotalMarks"
            type="number"
            placeholder="/500"
            value={values.class12TotalMarks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12TotalMarks && errors.class12TotalMarks}
            required
          />
          <TextInput
            label="PCM Percentage"
            name="class12PCMPercentage"
            type="number"
            placeholder="Enter your PCM percentage"
            value={values.class12PCMPercentage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12PCMPercentage && errors.class12PCMPercentage}
            required
          />
          <TextInput
            label="Marks in Physics"
            name="class12PhysicsMarks"
            type="number"
            placeholder="/100"
            value={values.class12PhysicsMarks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12PhysicsMarks && errors.class12PhysicsMarks}
            required
          />
          <TextInput
            label="Marks in Chemistry"
            name="class12ChemistryMarks"
            type="number"
            placeholder="/100"
            value={values.class12ChemistryMarks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.class12ChemistryMarks && errors.class12ChemistryMarks
            }
            required
          />
          <TextInput
            label="Marks in Mathematics"
            name="class12MathMarks"
            type="number"
            placeholder="/100"
            value={values.class12MathMarks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12MathMarks && errors.class12MathMarks}
            required
          />
          <TextInput
            label="Subject 4"
            name="class12Subject4"
            type="text"
            placeholder="Enter subject name"
            value={values.class12Subject4}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12Subject4 && errors.class12Subject4}
            required
          />
          <TextInput
            label="Marks in Subject 4"
            name="class12Subject4Marks"
            type="number"
            placeholder="/100"
            value={values.class12Subject4Marks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12Subject4Marks && errors.class12Subject4Marks}
            required
          />
          <TextInput
            label="Subject 5"
            name="class12Subject5"
            type="text"
            placeholder="Enter subject name"
            value={values.class12Subject5}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12Subject5 && errors.class12Subject5}
            required
          />
          <TextInput
            label="Marks in Subject 5"
            name="class12Subject5Marks"
            type="number"
            placeholder="/100"
            value={values.class12Subject5Marks}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.class12Subject5Marks && errors.class12Subject5Marks}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
