import { Meta, StoryFn } from "@storybook/react";
import SignUp from ".";
import { MemoryRouter } from "react-router";

export default {
  title: "organisms/SignUp",
  component: SignUp,
} as Meta;

const Template: StoryFn = (args) => (
  <MemoryRouter>
    <SignUp {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
