import React from "react";
import "./style.scss";

const TextInputForm = ({ id, type, name, required, value, onChange }) => {
  return (
    <input
      className="text-input-form"
      id={id}
      type={type}
      placeholder={name}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInputForm;
