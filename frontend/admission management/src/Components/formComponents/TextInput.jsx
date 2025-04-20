import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium mb-2"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`w-full px-3 py-2 border ${
          meta.touched && meta.error ? "border-red-500" : "border-[#00000066]"
        } rounded-lg`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
