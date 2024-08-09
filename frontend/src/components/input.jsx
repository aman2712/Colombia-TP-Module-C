import React from "react";

const Input = ({
  id,
  label,
  placeholder,
  value = '',
  type,
  onChange = () => {},
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-gray-400">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className="block w-full py-2 px-2 rounded-md bg-gray-200 text-black outline-none mb-4"
      />
    </div>
  );
};

export default Input;
