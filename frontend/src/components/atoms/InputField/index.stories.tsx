import { StoryFn, Meta } from "@storybook/react";
import InputField from ".";
import Eye from "../../../../public/assets/icons/eye.svg";
import { action } from "@storybook/addon-actions";

export default {
  title: "Atoms/InputField",
  component: InputField,
  argTypes: {
    type: {
      options: ["password", "text"],
      control: { type: "radio" },
    },
  },
} as Meta;

const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const UserNameTextField = Template.bind({});
UserNameTextField.args = {
  placeholder: "Enter your username",
};

export const PasswordVisibleTextField = Template.bind({});
PasswordVisibleTextField.args = {
  placeholder: "Create a password",
  type: "text",
  adornment: "end",
  src: Eye,
  handleClick: action("Icon is clicked"),
  iconSx: { cursor: "pointer" },
};
