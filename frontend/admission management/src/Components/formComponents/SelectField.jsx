import React from "react";

const SelectField = ({
  label,
  error,
  className = "",
  children,
  required,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        className={`
          px-3 py-2 
          border border-[#00000066]
          rounded-lg 
          
          ${error ? "border-red-500" : "border-[#00000066]"}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
