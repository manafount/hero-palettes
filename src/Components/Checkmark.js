import React from 'react';
function Checkmark (props) {
  let { svgStyles, circleStyles } = props.styles;
  return (
    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={svgStyles}>
      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" style={circleStyles}/>
      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
  );
}

export default Checkmark;