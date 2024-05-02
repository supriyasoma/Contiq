import { StoryFn, Meta } from "@storybook/react";
import Snackbar from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "Molecules/Snackbar",
  component: Snackbar,
} as Meta;

const Template: StoryFn<typeof Snackbar> = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  topPosition: "20%",
  open: false,
  handleClick: action("text copied!"),
  handleClose: action("snackbar is closed!"),
};
