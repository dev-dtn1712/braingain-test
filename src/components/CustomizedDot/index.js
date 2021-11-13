import React from 'react';

const CustomizedDot = ({ cx, cy }) => (
  <circle
    cx={cx}
    cy={cy}
    r={4}
    stroke='black'
    style={{ opacity: "0.9" }}
    strokeWidth={0.5}
    fill='#5884d8'
  />
);

export default CustomizedDot;