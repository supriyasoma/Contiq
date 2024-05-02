import { StoryFn, Meta } from "@storybook/react";
import IconWithTypography from ".";
import PdfIcon from "/public/assets/icons/pdfIcon.svg";
import PdfLargeIcon from "/public/assets/icons/pdfLarge.svg";
import HomeIcon from "/public/assets/icons/home.svg";
import BackIcon from "/public/assets/icons/back.svg";
import ProfileIcon from "/public/assets/icons/profile.svg";
import UploadIcon from "/public/assets/icons/upload.svg";
import FileBoxIcon from "/public/assets/icons/fileBoxIcon.svg";
import { Icon } from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typograpy";

export default {
  title: "Molecules/IconWithTypography",
  component: IconWithTypography,
} as Meta;

const Template: StoryFn<typeof IconWithTypography> = (args) => (
  <IconWithTypography {...args} />
);

export const PdfFileLabel = Template.bind({});
PdfFileLabel.args = {
  direction: "row",
  gap: "12px",
  alignDirection: "center",
  IconComponent: <Icon src={PdfIcon} alt="PdfIcon" />,
  TextComponent: (
    <MuiTypography text="Company agreement.ppt" typoVariant={"body1"} />
  ),
};

export const FileBoxIconWithLabel = Template.bind({});
FileBoxIconWithLabel.args = {
  direction: "row",
  gap: "15px",
  alignDirection: "center",
  IconComponent: <Icon src={FileBoxIcon} alt="Icon" />,
  TextComponent: <MuiTypography text="Company overview" typoVariant="body1" />,
};
