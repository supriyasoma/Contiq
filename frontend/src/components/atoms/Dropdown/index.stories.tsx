import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Dropdown from ".";
import { fileTypeOptions, publishOptions } from "../../../utils/constants";

export default {
  title: "Atoms/Dropdown",
  component: Dropdown,
  argTypes: {
    options: {
      control: { type: "array" },
    },
    placeholder: {
      control: { type: "text" },
    },
    header: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
    menuOpen: {
      control: { type: "boolean" },
    },
  },
} as Meta;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const FileDropdown = Template.bind({});
FileDropdown.args = {
  options: fileTypeOptions,
  placeholder: "File type",
  header: "File type",
  value: "",
  menuOpen: false,
  handleChange: action("New value is selected!"),
  handleClear: action("selected value is cleared"),
  handleMenu: action("menu is triggered"),
};

export const PublishDropdown = Template.bind({});
PublishDropdown.args = {
  options: publishOptions,
  placeholder: "Publish Setting",
  header: "Publish by",
  value: "",
  menuOpen: false,
  handleChange: action("New value is selected!"),
  handleClear: action("selected value is cleared"),
  handleMenu: action("menu is triggered"),
};
