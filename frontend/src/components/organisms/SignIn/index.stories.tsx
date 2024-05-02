import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SignIn from ".";
import { MemoryRouter } from "react-router";

export default {
  title: "organisms/SignIn",
  component: SignIn,
} as Meta;

const Template: StoryFn = (args) => (
  <MemoryRouter>
    <SignIn {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
