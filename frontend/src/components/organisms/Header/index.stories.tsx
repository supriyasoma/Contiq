import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Header from ".";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "organisms/Header",
  component: Header,
} as Meta;

const Template: StoryFn<{}> = () => (
  <MemoryRouter>
    <Header />
  </MemoryRouter>
);

export const HeaderWithDefaults = Template.bind({});
