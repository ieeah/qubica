export type SkeletonRectProps = {
  w?: string | number;
  h?: string | number;
  rounded?: boolean | string;
  className?: string;
}

export type SkeletonCircleProps = {
  radius: number | string;
  className?: string;
};

export type SkeletonParagraphProps = {
  lines?: number;
  className?: string;
};
