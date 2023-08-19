import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CheckBoxAlerts = (props) => {
  const [checkboxes, setCheckboxes] = useState({
    danger: false,
    warning: false,
    nonOfAbove: false,
  });

  useEffect(() => {
    props.onCheckBox({
      danger: checkboxes.danger,
      warning: checkboxes.warning,
      nonOfAbove: checkboxes.nonOfAbove,
    });
  }, [checkboxes]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "nonOfAbove") {
      setCheckboxes({
        danger: false,
        warning: false,
        nonOfAbove: checked,
      });
    }

    if (name === "danger" || name === "warning") {
      setCheckboxes((prevCheckBox) => ({
        ...prevCheckBox,
        [name]: checked,
        nonOfAbove: false,
      }));
    }

    console.log(checkboxes);
  };

  return (
    <div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              name="danger"
              checked={checkboxes.danger}
              onChange={handleCheckboxChange}
            />
          }
          label="Send danger to email"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              name="warning"
              checked={checkboxes.warning}
              onChange={handleCheckboxChange}
            />
          }
          label="Send Warning to email"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              name="nonOfAbove"
              checked={checkboxes.nonOfAbove}
              onChange={handleCheckboxChange}
            />
          }
          label="None of the above"
        />
      </div>
    </div>
  );
};

export default CheckBoxAlerts;
