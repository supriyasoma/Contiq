import { Box, IconButton, Stack, styled } from "@mui/material";
import theme from "../../../theme";
import IconWithTypography from "../../molecules/IconWithTypography";
import { Icon } from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typograpy";
import BackIcon from "/public/assets/icons/back.svg";
import CloseIcon from "/public/assets/icons/CloseIconWhite.svg";
import fileIcon from "/public/assets/icons/fileBoxIcon.svg";
import rightIcon from "/public/assets/icons/rightIcon.svg";
import { SyncProgress } from "../../molecules/SyncProgress";
import { CustomRadio } from "../../atoms/RadioButton";
import { useState } from "react";
import CheckboxWithIconAndTypography from "../../molecules/CheckboxWithIconAndTypography";
import Button from "../../atoms/Button";
import {
  LOCAL_FILE_UPLOAD,
  UPLOAD_FILES_FROM_CLOUD_CONSTANTS,
} from "../../../utils/constants";
import { notificationDetails } from "../../../services";
import { DriveFileData } from "../../../utils/interfaces";
import { uploadFileFromDrive } from "../../../services/fileApi";

interface FoldersModalProps {
  modalTitle?: string;
  syncProgess?: boolean;
  folderNames?: string[];
  fileNames?: FileNames[];
  syncProgressBox?: boolean;
}

export interface FileNames {
  folderName: string;
  fileNames: DriveFile[];
}

export interface DriveFile {
  fileName: string;
  fileId: string;
}

const ModalContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  width: "43.5rem",
  height: "37.375rem",
  backgroundColor: theme.palette.grays.gray400,
  borderRadius: "0.25rem",
});

const StyledStack = styled(Stack)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px",
});

const StyledBox = styled(Box)({
  marginTop: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FoldersContainer = styled(Box)({
  padding: "24px",
  height: "85%",
  gap: "18px",
});

const FilesContainer = styled(Box)({
  padding: "24px",
  height: "85%",
  gap: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const FilesBox = styled(Box)({
  marginTop: "12px",
  overflowY: "scroll",
  height: "90%",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    width: "0",
  },
});

const CustomBox = styled(Box)({
  border: `0.0625rem solid ${theme.palette.grays.gray300}`,
  borderRadius: "0.25rem",
  background: theme.palette.grays.gray400,
  padding: "0.75rem 1.5rem 0.75rem 2.5rem",
  marginBottom: "24px",
  display: "flex",
  justifyContent: "space-between",
});

const StyledButton = styled(Button)({
  width: "75px",
  height: "34px",
  backgroundColor: theme.palette.primary.main,
});

const StyledBackButton = styled(Button)({
  width: "75px",
  height: "34px",
  border: `1px solid ${theme.palette.text.mediumEmphasis}`,
});

const FileBox = styled(Box)({
  marginBottom: "24px",
});

export const FoldersModal = ({
  modalTitle,
  syncProgess,
  folderNames,
  fileNames,
  syncProgressBox,
}: FoldersModalProps) => {
  const [filesOpen, setFilesOpen] = useState<boolean>(false);
  const [filteredFileNames, setFilteredFileNames] = useState<
    FileNames[] | undefined
  >([]);
  const [newModalTitle, setNewModalTitle] = useState<string | undefined>(
    modalTitle
  );
  const [foldersOpen, setFoldersOpen] = useState<boolean | undefined>(
    syncProgess
  );
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  const handleFolderClick = (folder: string) => {
    const selectedFiles = fileNames?.filter((file: FileNames) => {
      return file.folderName === folder;
    });
    setFilteredFileNames(selectedFiles);
    setFoldersOpen(false);
    setNewModalTitle(folder);
    setFilesOpen(true);
  };

  const handleBackIconClick = () => {
    setNewModalTitle(modalTitle);
    setFilesOpen(false);
    setFoldersOpen(true);
  };

  const handleCheckboxClick = (fileName: string) => {
    if (selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter((file) => file !== fileName));
    } else {
      setSelectedFiles([...selectedFiles, fileName]);
    }
  };

  function getFileIdFromFileName(
    fileNames: FileNames[] | undefined,
    fileName: string
  ): string | null {
    for (const folder of fileNames ?? []) {
      const file = folder.fileNames.find((file) => file.fileName === fileName);
      if (file) {
        return file.fileId;
      }
    }
    return null;
  }

  const handleSync = async () => {
    if (selectedFiles) {
      for (const fileName of selectedFiles) {
        const fetchedFileId = getFileIdFromFileName(
          filteredFileNames,
          fileName
        );
        const fileData: DriveFileData = {
          fileName: fileName,
          filePath: "",
          fileId: fetchedFileId,
          fileType: "pdf",
          userId: parseInt(localStorage.getItem("id") ?? "1"),
          trashed: false,
          synced: false,
        };
        await uploadFileFromDrive(fileData);
        const notifyData = {
          createdAt: new Date(),
          action: LOCAL_FILE_UPLOAD.mockAction,
          userName: localStorage.getItem("name") ?? LOCAL_FILE_UPLOAD.mockName,
          fileName: `${fileName}.pdf`,
        };
        await notificationDetails(notifyData);
      }
    }
    window.location.reload();
  };

  return (
    <ModalContainer sx={{ display: modalOpen ? "" : "none" }}>
      <StyledStack
        direction={syncProgressBox ? "row-reverse" : "row"}
        borderBottom={
          syncProgressBox ? "" : `1px solid ${theme.palette.grays.gray300}`
        }
      >
        {!syncProgressBox && (
          <IconWithTypography
            IconComponent={
              <IconButton onClick={handleBackIconClick}>
                <Icon src={BackIcon} alt="BackIcon" />
              </IconButton>
            }
            TextComponent={
              <MuiTypography
                text={newModalTitle}
                typoVariant="h3"
                sx={{ color: theme.palette.text.white }}
              />
            }
            gap="0.9375rem"
            direction="row"
          />
        )}
        <Icon
          src={CloseIcon}
          alt="folders-close-icon"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setModalOpen(false);
          }}
        />
      </StyledStack>
      {syncProgressBox && (
        <StyledBox>
          <SyncProgress />
        </StyledBox>
      )}
      {foldersOpen && (
        <FoldersContainer>
          <MuiTypography
            text={UPLOAD_FILES_FROM_CLOUD_CONSTANTS.filesSync}
            typoVariant="body2"
            color={theme.palette.text.white}
          />
          <Stack direction={"row"} alignItems={"center"}>
            <CustomRadio data-testid="entireDrive" checked={false} />
            <MuiTypography
              text={"Sync entire drive"}
              typoVariant="body2"
              color={theme.palette.text.white}
            />
            <CustomRadio checked={true} />
            <MuiTypography
              text={"Sync folders"}
              typoVariant="body2"
              color={theme.palette.text.white}
            />
          </Stack>
          <FilesBox>
            {folderNames?.map((folder) => (
              <CustomBox
                width={"100%"}
                key={folder}
                sx={{ cursor: "pointer" }}
                onClick={() => handleFolderClick(folder)}
              >
                <IconWithTypography
                  direction="row"
                  gap="0.75rem"
                  alignDirection="center"
                  IconComponent={<Icon src={fileIcon} alt="Icon" />}
                  TextComponent={
                    <MuiTypography
                      text={folder}
                      typoVariant="body1"
                      color={theme.palette.text.white}
                    />
                  }
                />
                <Icon src={rightIcon} />
              </CustomBox>
            ))}
          </FilesBox>
        </FoldersContainer>
      )}
      {filesOpen && (
        <FilesContainer>
          {
            <FilesBox>
              {filteredFileNames?.[0]?.fileNames?.map((file: DriveFile) => (
                <FileBox key={file.fileName}>
                  <CheckboxWithIconAndTypography
                    id={file.fileId}
                    fileName={file.fileName}
                    width={"100%"}
                    selected={selectedFiles.includes(file.fileName)}
                    onClick={() => handleCheckboxClick(file.fileName)}
                  />
                </FileBox>
              ))}
            </FilesBox>
          }
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignSelf={"flex-end"}
            spacing={2}
            paddingRight={"24px"}
          >
            <StyledBackButton>
              <MuiTypography
                text={"Back"}
                typoVariant={"body1"}
                color={theme.palette.text.mediumEmphasis}
              />
            </StyledBackButton>
            <StyledButton onClick={handleSync}>
              <MuiTypography
                text={"Sync"}
                typoVariant={"body1"}
                color={theme.palette.text.white}
              />
            </StyledButton>
          </Stack>
        </FilesContainer>
      )}
    </ModalContainer>
  );
};
