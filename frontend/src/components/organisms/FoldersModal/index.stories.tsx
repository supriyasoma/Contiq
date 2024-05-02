import { StoryFn, Meta } from "@storybook/react";
import { FoldersModal } from ".";

export default {
  title: "Organisms/FoldersModal",
  component: FoldersModal,
} as Meta;

const folderNames = ["Folder 1", "Folder 2", "Folder 3"];
const fileNames = [
  { folderName: "Folder 1", fileNames: ["File 1", "File 2"] },
  { folderName: "Folder 2", fileNames: ["File 3", "File 4"] },
  { folderName: "Folder 3", fileNames: ["File 5", "File 6"] },
];

const Template: StoryFn<typeof FoldersModal> = (args) => (
  <FoldersModal {...args} folderNames={folderNames} fileNames={fileNames} />
);

export const Default = Template.bind({});
Default.args = {
  modalTitle: "Choose Folders",
  syncProgess: true,
  syncProgressBox: false,
};

export const SyncProgress = Template.bind({});
SyncProgress.args = {
  modalTitle: "Choose Folders",
  syncProgess: false,
  syncProgressBox: true,
};
