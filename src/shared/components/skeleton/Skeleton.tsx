import React from "react";
import type {
  SkeletonRectProps,
  SkeletonCircleProps,
  SkeletonParagraphProps,
} from "./skeleton.type";
import styles from "./skeleton.module.css";

const Rect: React.FC<SkeletonRectProps> = ({
  w = "100%",
  h = "1rem",
  rounded = false,
  className = "",
}) => {
  const borderRadius =
    typeof rounded === "string"
      ? rounded
      : rounded
        ? "var(--spacing-md, 8px)"
        : "0";
  const width = typeof w === "number" ? `${w}px` : w;
  const height = typeof h === "number" ? `${h}px` : h;

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

const Circle: React.FC<SkeletonCircleProps> = ({ radius, className = "" }) => {
  const size =
    typeof radius === "number" ? `${radius * 2}px` : `calc(${radius} * 2)`;
  return <Rect w={size} h={size} rounded="50%" className={className} />;
};

const Paragraph: React.FC<SkeletonParagraphProps> = ({
  lines = 3,
  className = "",
}) => {
  const widths = ["95%", "85%", "75%", "90%", "80%"];
  return (
    <div className={`${styles.paragraph} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Rect key={i} w={widths[i % widths.length]} h="1rem" rounded />
      ))}
    </div>
  );
};

export const Skeleton = {
  Rect,
  Circle,
  Paragraph,
};
