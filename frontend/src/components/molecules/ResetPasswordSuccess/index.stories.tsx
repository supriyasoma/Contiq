import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import ResetPasswordSuccess from ".";
export default {
  title: "Molecules/ResetPasswordSucess",
  component: ResetPasswordSuccess,
} as Meta<typeof ResetPasswordSuccess>;

const Template: StoryFn<typeof ResetPasswordSuccess> = (args) => <ResetPasswordSuccess {...args} />;

export const ResetSuccess = Template.bind({});
ResetSuccess.args = {
 handleContinue:action("Continue")
};
