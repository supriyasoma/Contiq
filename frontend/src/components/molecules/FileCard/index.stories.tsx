import { StoryFn, Meta } from "@storybook/react";
import { FileCard } from ".";
import PDFImage from "../../../../public/assets/images/fileCard.svg";

export default {
  title: "Molecules/FileCard",
  component: FileCard,
} as Meta;

const Template: StoryFn<typeof FileCard> = (args) => <FileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  fileName: "Company agreement.pdf",
  pdfImage: PDFImage,
};
