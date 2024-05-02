import { Box, Divider, styled } from "@mui/material";
import theme from "../../theme";
import Button from "../../components/atoms/Button";

export const TopHeaderBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
  height: "5rem",
  padding: "1.75rem 1.5rem",
});

export const FiltersBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "1.75rem 1.5rem",
  height: "3.75rem",
  width: "100%",
});

export const SubFiltersBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  gap: "0.625rem",
});

export const MenuBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: "0.625rem",
});

export const RevelantBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: `0.0625rem solid ${theme.palette.grays.gray100}`,
  borderRadius: "0.25rem",
  width: "fit-content",
  height: "2.25rem",
  padding: "0rem 0.625rem",
  background: "white",
  gap: "0.625rem",
});

export const TabsBox = styled(Box)({
  display: "flex",
  width: "100%",
  height: "2.125rem",
  padding: "1.75rem 1.5rem",
  position: "relative",
  marginBottom: "1.875rem",
});

export const CustomDivider = styled(Divider)({
  color: "rgba(235, 236, 240, 0.05)",
  width: "96%",
  height: "1.25rem",
  zIndex: "1000",
  position: "absolute",
  top: "100%",
  padding: "0rem 1.5rem",
});

export const FilesContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  padding: "1.5rem",
  gap: "1.25rem",
  height: "58vh",
  marginRight: "1.25rem",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0.3125rem",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f0f0f0",
    borderRadius: "0.75rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d9d9d9",
    borderRadius: "1rem",
    width: "0.375rem",
    height: "12.25rem",
    border: "0.25rem solid transparent",
    backgroundClip: "content-box",
  },
});

export const NoFilesContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "55vh",
  gap: "1.25rem",
});

export const CustomAddFilesButton = styled(Button)({
  width: theme.spacing(30),
  height: theme.spacing(9),
  padding: "0.375rem 0.5rem",
  alignItems: "center",
});
