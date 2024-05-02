import { StoryFn, Meta } from "@storybook/react";
import { UploadFromCloud } from ".";

export default {
  title: "Organisms/UploadFromCloud",
  component: UploadFromCloud,
} as Meta;

const Template: StoryFn<typeof UploadFromCloud> = () => <UploadFromCloud />;

export const Default = Template.bind({});
