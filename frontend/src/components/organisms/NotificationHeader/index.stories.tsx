import NotificationCard, { NotificationProp } from ".";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
export default {
  title: "Organisms/NotificationCard",
  component: NotificationCard,
} as Meta;

const Template: StoryFn<NotificationProp> = (args) => (
  <NotificationCard {...args} />
);

export const Notification = Template.bind({});
Notification.args = {
  onClose: action("Close icon clicked"),
};
