import React, { useState } from "react";
import { Box, styled, Tab as MUITab, Tabs as MUITabs } from "@mui/material";
import theme from "../../../theme";
import MuiTypography from "../Typograpy";
export interface ITabData {
  label: string;
  disabled: boolean;
}

export interface TabsProps {
  tabs: ITabData[];
  activeTabColor: string;
  inactiveTabColor: string;
  backgroundColor: string;
  width: string;
  onTabSelect: (selectedTab: string) => void;
}
const Container = styled(Box)<{ width: string; backgroundColor: string }>(
  ({ width, backgroundColor }) => ({
    backgroundColor: backgroundColor,
    width: width,
    "& .MuiTabs-indicator": {
      height: theme.spacing(0.7),
    },
    borderBottom:
      width !== "100%"
        ? `2px solid white`
        : `2px solid ${theme.palette.grays.gray300}`,
  })
);

const Tab = styled(MUITab)<{
  activeTabColor: string;
  inactiveTabColor: string;
}>(({ activeTabColor, inactiveTabColor }) => ({
  flex: 1,
  textTransform: "none",
  color: inactiveTabColor,
  "&.Mui-selected": {
    color: activeTabColor,
    "& .MuiTabs-indicator": {
      backgroundColor: activeTabColor,
    },
  },
}));

const StyledTabs = styled(MUITabs)({
  display: "flex",
  width: "100%",
});

const Tabs = (props: TabsProps) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const selectedTabLabel = props.tabs[newValue].label;
    setTabIndex(newValue);
    props.onTabSelect(selectedTabLabel);
  };

  return (
    <Container width={props.width} backgroundColor={props.backgroundColor}>
      <StyledTabs value={tabIndex} onChange={handleChange}>
        {props.tabs.map((tab) => (
          <Tab
            key={tab.label}
            disabled={tab.disabled}
            label={<MuiTypography typoVariant="body1" text={tab.label} />}
            activeTabColor={props.activeTabColor}
            inactiveTabColor={props.inactiveTabColor}
          />
        ))}
      </StyledTabs>
    </Container>
  );
};

export default Tabs;
