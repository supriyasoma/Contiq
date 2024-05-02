import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Tabs, { TabsProps, ITabData } from "./";
import { action } from "@storybook/addon-actions";
import theme from "../../../theme";
import { tabsOne, tabsTwo } from "../../../utils/constants";
export default {
  title: "Atoms/Tabs",
  component: Tabs,
} as Meta;

const Template: StoryFn<TabsProps> = (args) => <Tabs {...args} />;

export const FileTabs = Template.bind({});
FileTabs.args = {
  tabs: tabsOne,
  activeTabColor: "#8B3DFF",
  inactiveTabColor: theme.palette.grays.gray200,
  backgroundColor: theme.palette.grays.gray600,
  width: "450px",
  onTabSelect: action("onTabSelect"),
};

export const UploadFiles = Template.bind({});
UploadFiles.args = {
  tabs: tabsTwo,
  activeTabColor: "#FFFFFF",
  inactiveTabColor: theme.palette.grays.gray200,
  backgroundColor: theme.palette.grays.gray400,
  width: "696px", 
  onTabSelect: action("onTabSelect"),
};
