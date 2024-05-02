import { Stack } from "@mui/material";
import React from "react";

type FlexDirections =
  | "flex-start"
  | "flex-end"
  | "space-evenly"
  | "space-between"
  | "center";

interface IconWithTypographyProps {
  className?: string;
  IconComponent: React.ReactNode;
  TextComponent: React.ReactNode;
  gap: string;
  direction: "row" | "column";
  justifyDirection?: FlexDirections;
  alignDirection?: FlexDirections;
}

const IconWithTypography = ({
  className,
  IconComponent,
  TextComponent,
  gap,
  direction,
  justifyDirection,
  alignDirection,
}: IconWithTypographyProps) => {
  return (
    <Stack
      className={className}
      gap={gap}
      direction={direction}
      justifyContent={justifyDirection}
      alignItems={alignDirection}
    >
      {IconComponent}
      {TextComponent}
    </Stack>
  );
};

export default IconWithTypography;
