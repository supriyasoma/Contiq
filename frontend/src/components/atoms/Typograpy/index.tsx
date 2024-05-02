import { Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

export type CustomTypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption1"
  | "overline1"
  | "overline2";

export interface CustomTypographyProps extends TypographyProps {
  text: ReactNode;
  typoVariant: CustomTypographyVariant;
}
const MuiTypography = ({
  typoVariant,
  sx,
  text,
  ...typoprops
}: CustomTypographyProps) => {
  return (
    <Typography
      data-testid="Typography-component"
      variant={typoVariant}
      sx={sx}
      {...typoprops}
    >
      {text}
    </Typography>
  );
};

export default MuiTypography;
