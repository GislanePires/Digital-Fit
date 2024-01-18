import React from "react";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CheckBox = ({
  id,
  label,
  isChecked,
  handleCheckboxChange,
  inputProps,
  checkboxProps,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          color="warning"
          size="small"
          sx={{
            [`&`]: {
              color: "var(--azul-escuro)",
            },
          }}
          inputProps={{
            ...inputProps,
            "aria-label": "secondary checkbox",
          }}
          checked={isChecked}
          onChange={handleCheckboxChange}
          {...checkboxProps}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;