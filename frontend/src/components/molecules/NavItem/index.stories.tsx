import { Meta, StoryFn } from "@storybook/react";
import NavItem from ".";
import home from "/public/assets/icons/home.svg";
import homeActive from "/public/assets/icons/homeActive.svg";

export default {
  title: "Molecules/NavItem",
  component: NavItem,
} as Meta;

const Template: StoryFn<typeof NavItem> = (args) => <NavItem {...args} />;

export const InactiveNavItem = Template.bind({});
InactiveNavItem.args = {
  icon: home,
  text: "Home",
  activeSrc: homeActive,
  isActive: false,
};

export const ActiveNavItem = Template.bind({});
ActiveNavItem.args = {
  icon: home,
  text: "Home",
  activeSrc: homeActive,
  isActive: true,
};
