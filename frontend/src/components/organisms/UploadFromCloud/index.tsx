import { Icon } from "../../atoms/Icons";
import DriveIcon from "../../../../public/assets/icons/driveIcon.svg";
import DropBoxIcon from "../../../../public/assets/icons/dropBoxIcon.svg";
import ICloudIcon from "../../../../public/assets/icons/icloudIcon.svg";
import TeraBoxIcon from "../../../../public/assets/icons/teraBox.svg";
import { gapi } from "gapi-script";
import AddFileModal from "../AddFileModal";
import MuiTypography from "../../atoms/Typograpy";
import { Box, Stack, styled } from "@mui/material";
import theme from "../../../theme";
import { FileNames, FoldersModal } from "../FoldersModal";
import { useEffect, useState } from "react";
import { initClient, listFiles } from "../../../services/gapiService";
import {
  LOCAL_FILE_UPLOAD,
  UPLOAD_FILES_FROM_CLOUD_CONSTANTS,
} from "../../../utils/constants";
import LocalFileUpload from "../LocalFileUpload";
import { ProgressBar } from "../../molecules/ProgressBarModel/index.stories";
import { notificationDetails } from "../../../services";
import { uploadFileFromLocal } from "../../../services/fileApi";

export interface FileData {
  id: number;
  name: string;
}
const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  gap: "24px",
  height: "304px",
});

const ProgressBox = styled(Box)({
  marginTop: "120px",
});

export const UploadFromCloud = () => {
  const [folderOpen, setFolderOpen] = useState<boolean>(false);
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<FileNames[]>([]);
  const [showSyncProgress, setShowSyncProgress] = useState(false);
  const [uploaded, setUploaded] = useState<boolean>(true);
  const [tab, setTab] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(
    UPLOAD_FILES_FROM_CLOUD_CONSTANTS.firstModalTitle
  );
  const [selectedFile, setSelectedFile] = useState<string>();
  const [acceptedFile, setAcceptedFile] = useState<File>();

  const handleUpload = (fileName: string) => {
    setSelectedFile(fileName);
    setTab(false);
    setTitle("");
  };

  const handleDuplicateUpload = (fileData: File, fileName: string) => {
    setAcceptedFile(fileData);
    setSelectedFile(fileName);
    setUploaded(false);
  };

  const handleRepeatUpload = () => {
    const notifyData = {
      createdAt: new Date(),
      action: LOCAL_FILE_UPLOAD.mockAction,
      userName: localStorage.getItem("name") ?? LOCAL_FILE_UPLOAD.mockName,
      fileName: selectedFile ?? "file",
    };
    if (acceptedFile) {
      uploadFileFromLocal(acceptedFile, {
        userId: parseInt(localStorage.getItem("id") ?? "1"),
        fileName: selectedFile,
      });
    }
    notificationDetails(notifyData);
    setUploaded(true);
    setTitle("");
    setTab(false);
  };

  const switchToNextState = async () => {
    setTimeout(() => {
      setFolderOpen(true);
      setShowSyncProgress(false);
      listFiles()
        .then(({ folderNamesArray, foldersWithFiles }) => {
          setFolderNames(folderNamesArray);
          setFileNames(foldersWithFiles);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }, 3000);
  };

  const handleClientLoad = () => {
    setShowSyncProgress(true);
    gapi.load("client:auth2", initClient);
  };

  const handleRepeatCancel = () => {
    setTab(true);
    setUploaded(true);
    setTitle(UPLOAD_FILES_FROM_CLOUD_CONSTANTS.firstModalTitle);
  };

  useEffect(() => {
    if (showSyncProgress) {
      switchToNextState();
    }
  }, [showSyncProgress, selectedFile]);

  function extractBaseFilename(filename: string) {
    const regex = /^(.*?)(?:\(\d+\))?(\.[^.]+)?$/;
    const match = regex.exec(filename);
    return match ? match[1] + (match[2] || "") : filename;
  }

  return (
    <AddFileModal
      fileName={selectedFile ? extractBaseFilename(selectedFile) : "file"}
      isUploaded={uploaded}
      tabs={tab}
      modalTitle={title}
      CloudBody={
        <StyledBox>
          {!showSyncProgress && (
            <>
              <MuiTypography
                text={UPLOAD_FILES_FROM_CLOUD_CONSTANTS.driveFolders}
                typoVariant="subtitle2"
                color={theme.palette.text.white}
                textAlign={"center"}
                width={"70%"}
              />
              <Stack direction={"row"} spacing={5}>
                <Icon
                  src={DriveIcon}
                  alt="driveIcon"
                  sx={{ cursor: "pointer" }}
                  onClick={handleClientLoad}
                />
                <Icon src={DropBoxIcon} />
                <Icon src={ICloudIcon} />
                <Icon src={TeraBoxIcon} />
              </Stack>
            </>
          )}
          {showSyncProgress && <FoldersModal syncProgressBox={true} />}
          {folderOpen && (
            <FoldersModal
              folderNames={folderNames}
              fileNames={fileNames}
              modalTitle={UPLOAD_FILES_FROM_CLOUD_CONSTANTS.modalTitle}
              syncProgess={true}
            />
          )}
        </StyledBox>
      }
      UploadBody={
        <LocalFileUpload
          onFileUpload={handleUpload}
          onDuplicateFileUpload={handleDuplicateUpload}
        />
      }
      Content={
        <ProgressBox>
          <ProgressBar fileName={selectedFile ?? "file"} />
        </ProgressBox>
      }
      handleCancel={handleRepeatCancel}
      handleUpload={handleRepeatUpload}
    />
  );
};
