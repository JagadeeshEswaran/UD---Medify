import React from "react";

const FormInput = ({
  label,
  name,
  defaultValue,
  type,
  placeHolder,
  size,
  required,
}) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        className={`input input-bordered ${size}`}
        required={required}
      />
    </label>
  );
};

export default FormInput;
