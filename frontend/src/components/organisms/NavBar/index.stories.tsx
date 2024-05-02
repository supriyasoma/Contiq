import { StoryFn, Meta } from "@storybook/react";
import NavBar from ".";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "Organisms/NavBar",
  component: NavBar,
} as Meta;

const Template: StoryFn<typeof NavBar> = (args) => (
  <MemoryRouter>
    <NavBar {...args} />
  </MemoryRouter>
);

export const Home = Template.bind({});
export const File = Template.bind({});
File.args = {
  selectedItem: "Files",
};
