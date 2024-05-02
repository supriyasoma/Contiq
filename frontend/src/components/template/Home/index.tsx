import React from "react";
import { styled, Box } from "@mui/material";

interface HomeProps {
  Header?: React.ReactNode;
  Sidebar?: React.ReactNode;
  Content?: React.ReactNode;
}

const OuterContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "92vh",
  width: "100%",
});

const HeaderContainer = styled(Box)({
  height: "fit-content",
  width: "100%",
});

const BodyContainer = styled(Box)({
  display: "flex",
  textAlign: "center",
  width: "100%",
});

const SidebarContainer = styled(Box)({
  display: "flex",
  textAlign: "center",
  height: "fit-content",
  width: "fit-content",
});

const ContentContainer = styled(Box)({
  display: "flex",
  width: "100%",
});

const Home = ({ Header, Sidebar, Content }: HomeProps) => {
  return (
    <OuterContainer>
      <HeaderContainer>{Header ?? "Header"}</HeaderContainer>
      <BodyContainer>
        <SidebarContainer>{Sidebar ?? "Sidebar"}</SidebarContainer>
        <ContentContainer>{Content ?? "Content"}</ContentContainer>
      </BodyContainer>
    </OuterContainer>
  );
};

export default Home;
