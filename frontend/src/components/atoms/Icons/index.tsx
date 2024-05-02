import React, { SyntheticEvent } from "react";

interface CustomIconProps {
  src?: string;
  alt?: string;
  sx?: React.CSSProperties;
  width?: string;
  height?: string;
  onClick?: (event: Event | SyntheticEvent<any, Event>) => void;
}

export const Icon = ({
  src,
  alt,
  sx,
  width,
  height,
  onClick,
}: CustomIconProps) => {
  return (
    <img
      data-testid="icon"
      src={src}
      alt={alt}
      style={sx}
      width={width}
      height={height}
      onClick={onClick}
      onKeyDown={() => {}}
    />
  );
};
