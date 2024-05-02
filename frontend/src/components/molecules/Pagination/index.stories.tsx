import { StoryFn, Meta } from "@storybook/react";
import Pagination from ".";
export default {
  title: "Molecules/Pagination",
  component: Pagination,
  argTypes: {
    zoomIn: { action: "Zoom In" },
    zoomOut: { action: "Zoom Out" },
  },
} as Meta;

const Template: StoryFn<typeof Pagination> = (args) => <Pagination {...args} />;

export const PdfPagination = Template.bind({});
PdfPagination.args = {
  currentPage: 1,
  totalPages: 5,
  zoomValue: 85,
};
