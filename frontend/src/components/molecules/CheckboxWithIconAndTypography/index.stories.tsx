import { StoryFn, Meta } from "@storybook/react";
import CheckboxWithIconAndTypography from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "Molecules/CheckboxWithIconAndTypography",
  component: CheckboxWithIconAndTypography,
} as Meta;

const Template: StoryFn<typeof CheckboxWithIconAndTypography> = (args) => (
  <CheckboxWithIconAndTypography {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "1",
  fileName: "Company overview",
  width: "35%",
  selected: false,
  onClick: action("File is selected"),
};
