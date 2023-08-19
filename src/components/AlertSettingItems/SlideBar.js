import { useState } from "react";
import "./SlideBar.css";

const ScrollBar = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.value);

  const handleSliderInput = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    props.onChangeSlideBar(newValue, props.name, props.category);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={0}
        max={100}
        value={selectedValue}
        onChange={handleSliderInput}
        className="slider"
      />
      <div className="slider-value">
        <span>Selected Value: {selectedValue}</span>
      </div>
    </div>
  );
};

export default ScrollBar;
