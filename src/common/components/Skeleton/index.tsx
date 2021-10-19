import React from "react";
import "./index.scss";

interface SkeletonProps {
  className?: string;
  variant?: string;
  width?: number;
  height?: number;
}
export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "",
  width = "",
  height = ""
}) => {
  return (
    <div
      style={{ width, height }}
      className={`fpp_skeleton ${className} ${
        variant === "circle" ? "fpp_skeleton-circle" : "fpp_skeleton-rect"
      }`}
    ></div>
  );
};

export default Skeleton;
