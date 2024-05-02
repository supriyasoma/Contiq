import React from "react";
import { Box, styled } from "@mui/material";
import { Icon } from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typograpy";
import theme from "../../../theme";

interface NavItemProps {
  icon: string;
  text: string;
  activeSrc: string;
  isActive: boolean;
}

const InnerStack = styled(Box)(({ isActive }: { isActive: boolean }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: theme.spacing(20.5),
  width: theme.spacing(20.5),
  backgroundColor: isActive
    ? theme.palette.grays.gray400
    : theme.palette.grays.gray500,
}));

const NavItem = ({ icon, text, activeSrc, isActive }: NavItemProps) => (
  <InnerStack isActive={isActive}>
    <Icon
      src={isActive ? activeSrc : icon}
      alt={text}
      width={theme.spacing(6)}
      height={theme.spacing(6)}
    />
    <MuiTypography
      text={text}
      typoVariant="caption1"
      color={isActive ? theme.palette.text.white : theme.palette.grays.gray200}
    />
  </InnerStack>
);

export default NavItem;
