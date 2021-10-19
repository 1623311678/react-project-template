import React from "react";
import "./index.scss";

interface IconProps {
  name: string;
  className?: string;
  color?: string;
  size?: string | number;
}
const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  color = "",
  size = ""
}) => {
  return (
    <svg 
    className={`icon  ${className}`}
      style={{
        color: color,
        fontSize: size + "px"
      }}
     aria-hidden="true">
      <use xlinkHref={`#${name}`}></use>
    </svg >
  );
};

export default Icon;
