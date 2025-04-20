import { useField } from "formik";

const RadioGroup = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={
              option.bordered
                ? "flex items-center border border-gray-300 rounded-md px-4 py-2"
                : "flex items-center"
            }
          >
            <input
              type="radio"
              id={`${props.name}-${option.value}`}
              {...field}
              value={option.value}
              checked={field.value === option.value}
              className="mr-2 rounded-xl text-sm"
            />
            <label
              htmlFor={`${props.name}-${option.value}`}
              className="text-sm"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default RadioGroup;
