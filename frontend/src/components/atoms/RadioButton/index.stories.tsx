import { StoryFn, Meta } from "@storybook/react";
import { CustomRadio } from ".";

export default {
  title: "Atoms/RadioButton",
  component: CustomRadio,
} as Meta;

const Template: StoryFn<typeof CustomRadio> = (args) => (
  <CustomRadio {...args} />
);

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
};
