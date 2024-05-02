import { StoryFn, Meta } from "@storybook/react";
import NotificationCard from ".";
import avatar from "/public/assets/icons/avatar.svg";
export default {
  title: "Molecules/NotificationCard",
  component: NotificationCard,
} as Meta;

const Template: StoryFn<typeof NotificationCard> = (args) => (
  <NotificationCard {...args} />
);

export const UploadNotification = Template.bind({});
UploadNotification.args = {
  fileName: "company agreement.pdf",
  userAction: "uploaded",
  dateTime: "20 June 10:30 AM",
  avatarSrc: avatar,
  avatarAlt: "Avatar",
  name: "Vamsi",
};
