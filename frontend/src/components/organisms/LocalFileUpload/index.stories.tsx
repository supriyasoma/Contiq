import { StoryFn, Meta } from "@storybook/react";
import LocalFileUpload from ".";

export default {
  title: "Organisms/LocalFileUpload",
  component: LocalFileUpload,
} as Meta;

const Template: StoryFn<typeof LocalFileUpload> = (args) => (
  <LocalFileUpload {...args} />
);

export const LocalFile = Template.bind({});
