import { Meta, StoryFn } from "@storybook/react";
import ProgressBarModal from ".";

export default {
  title: "Molecules/ProgressBarModel",
  component: ProgressBarModal,
} as Meta;

const Template: StoryFn<typeof ProgressBarModal> = (args) => (
  <ProgressBarModal {...args} />
);

export const ProgressBar = Template.bind({});
ProgressBar.args = {
  fileName: "Agreement.pdf",
};
