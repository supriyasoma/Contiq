import { StoryFn, Meta } from "@storybook/react";
import { CreateNewPassword } from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "Organisms/CreateNewPassword",
  component: CreateNewPassword,
} as Meta;

const Template: StoryFn<typeof CreateNewPassword> = (args) => (
  <CreateNewPassword {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleResetPassword: action("Successfully reset the password"),
};
