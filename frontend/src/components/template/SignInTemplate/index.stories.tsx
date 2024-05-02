import { StoryFn, Meta } from "@storybook/react";
import SignInTemplate from ".";
import SigninImage from "/public/assets/images/leftContainer.png";
export default {
  title: "Template/SignIntemplate",
  component: SignInTemplate,
} as Meta;

const Template: StoryFn<typeof SignInTemplate> = (args) => <SignInTemplate {...args} />;

export const Default = Template.bind({});
Default.args={
    image:SigninImage,
    data:"new"
};
