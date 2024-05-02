import { StoryFn, Meta } from "@storybook/react";
import { Icon } from ".";
import Home from "../../../../public/assets/icons/home.svg";
import SigninImage from "../../../../public/assets/images/leftContainer.png";

export default {
  title: "Atoms/Image",
  component: Icon,
} as Meta;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

export const HomeIcon = Template.bind({});
HomeIcon.args = {
  src: Home,
};

export const LoginImage = Template.bind({});
LoginImage.args = {
  src: SigninImage,
};
