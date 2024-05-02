import React from "react";
import MuiTypography, { CustomTypographyProps } from ".";
import { StoryFn, Meta } from "@storybook/react";
export default {
  title: "atoms/Typography",
  component: MuiTypography,
} as Meta;
const Template: StoryFn<CustomTypographyProps> = (args) => (
  <MuiTypography {...args} />
);
export const Default = Template.bind({});
Default.args = {
  text: "Home",
  typoVariant: "h2",
};
