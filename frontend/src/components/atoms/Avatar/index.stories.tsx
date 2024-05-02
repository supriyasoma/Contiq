import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import avatar from "/public/assets/icons/avatar.svg";
import Avatar from ".";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    sx: { control: "object" },
  },
} as Meta;
const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const StandardAvatar = Template.bind({});
StandardAvatar.args = {
  src: avatar,
  alt: "profile image",
};
export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
  src: avatar,
  alt: "profile image",
  sx: { width: 24, height: 24 },
};

export const LargeAvatar = Template.bind({});
LargeAvatar.args = {
  src: avatar,
  alt: "profile image",
  sx: { width: 56, height: 56 },
};
