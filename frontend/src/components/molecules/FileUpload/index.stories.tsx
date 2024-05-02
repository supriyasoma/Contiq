import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import FileUpload, { FileUploadProps } from "./";
import { action } from "@storybook/addon-actions";
export default {
  title: "molecules/FileUpload",
  component: FileUpload,
} as Meta;
const Template: StoryFn<FileUploadProps> = (args) => <FileUpload {...args} />;
export const ContractAgreementPDF = Template.bind({});
ContractAgreementPDF.args = {
  uploaddocument: "Contractagreement.pdf",
  handleCancel: action("cancel clicked"),
  handleUpload: action("upload clicked")
};
