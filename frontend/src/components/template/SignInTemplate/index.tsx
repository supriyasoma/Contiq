import { Box, styled } from "@mui/material";
import React from "react";
import theme from "../../../theme";
import { Icon } from "../../atoms/Icons";

interface SignInTemplateProps {
  image: string;
  data?: React.ReactNode;
}

const MainContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  overflow: "hidden",
});

const RightContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flex: 1,
  marginLeft: "7.125rem",
});

const LeftContainer = styled(Box)({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  width: "55%",
  objectFit: "cover",
});

const SignInTemplate = ({ image, data }: SignInTemplateProps) => {
  return (
    <MainContainer data-testid="login-template">
      <LeftContainer>
        <Icon src={image} alt={"Image"} width={"100%"} height={"100%"} />
      </LeftContainer>
      <RightContainer>{data ?? "content"}</RightContainer>
    </MainContainer>
  );
};

export default SignInTemplate;
