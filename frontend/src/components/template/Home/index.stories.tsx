import { StoryFn, Meta } from "@storybook/react";
import Home from ".";
import Header from "../../organisms/Header";
import SideBar from "../../organisms/NavBar";
import PdfViewer from "../../organisms/PdfViewer";
import { MemoryRouter } from "react-router";

export default {
  title: "Template/Home",
  component: Home,
} as Meta;

const Template: StoryFn<typeof Home> = (args) => (
  <MemoryRouter>
    <Home {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  Header: <Header />,
  Sidebar: <SideBar />,
  Content: (
    <PdfViewer
      fileName="sample.pdf"
      searchKey="pdf"
      fileRender="/files/sample.pdf"
    />
  ),
};
