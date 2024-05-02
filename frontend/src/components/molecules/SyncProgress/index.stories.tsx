import { StoryFn, Meta } from "@storybook/react";
import { SyncProgress } from ".";
export default {
  title: "Molecules/SyncProgress",
  component: SyncProgress,
} as Meta;

const Template: StoryFn<typeof SyncProgress> = (args) => (
  <SyncProgress />
);

export const Sync = Template.bind({});
