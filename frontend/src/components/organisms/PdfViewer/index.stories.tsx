import { StoryFn, Meta } from "@storybook/react";
import PdfViewer from ".";
import { MemoryRouter } from "react-router";

export default {
  title: "Organisms/PdfViewer ",
  component: PdfViewer,
} as Meta;

const Template: StoryFn<typeof PdfViewer> = (args) => (
  <MemoryRouter>
    <PdfViewer {...args} />
  </MemoryRouter>
);

export const WithoutSearchKey = Template.bind({});
WithoutSearchKey.args = {
  fileName: "sample.pdf",
  fileRender: "files/sample.pdf",
};

export const WithSearchKey = Template.bind({});
WithSearchKey.args = {
  fileName: "sample.pdf",
  searchKey: "compile",
  fileRender: "files/sample.pdf",
};
