import { StoryFn, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AddFileModal from ".";
import MuiTypography from "../../atoms/Typograpy";
import theme from "../../../theme";

export default {
  title: "Organisms/AddFileModal",
  component: AddFileModal,
} as Meta;

const Template: StoryFn<typeof AddFileModal> = (args) => (
  <AddFileModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isUploaded: true,
  tabs: true,
  modalTitle: "Upload Files",
  UploadBody: (
    <MuiTypography
      text="Upload Body"
      typoVariant="h3"
      sx={{ color: theme.palette.text.white }}
    />
  ),
  CloudBody: (
    <MuiTypography
      text="Cloud Body"
      typoVariant="h3"
      sx={{ color: theme.palette.text.white }}
    />
  ),
  Content: (
    <MuiTypography
      text="Cloud Body"
      typoVariant="h3"
      sx={{ color: theme.palette.text.white }}
    />
  ),
};
export const FileUpload = Template.bind({});
FileUpload.args = {
  isUploaded: false,
  tabs: false,
  handleCancel: action("Clicked Cancel"),
  handleUpload: action("Clicked Upload"),
};
