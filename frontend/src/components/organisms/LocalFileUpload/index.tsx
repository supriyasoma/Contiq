import React, { useEffect, useState } from "react";
import MuiTypography from "../../atoms/Typograpy";
import theme from "../../../theme";
import { Box } from "@mui/material";
import Button from "../../atoms/Button";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/system";
import upload from "/public/assets/icons/upload.svg";
import pdfLarge from "/public/assets/icons/pdfLarge.svg";
import { Icon } from "../../atoms/Icons";
import { LOCAL_FILE_UPLOAD } from "../../../utils/constants";
import { DriveFileData } from "../../../utils/interfaces";
import { fileData, notificationDetails } from "../../../services";
import { uploadFileFromLocal } from "../../../services/fileApi";
export interface IFileDropProps {
  onFileUpload: (fileName: string) => void;
  onDuplicateFileUpload: (fileData: File, fileName: string) => void;
}

const LocalFileUpload = ({
  onDuplicateFileUpload,
  onFileUpload,
}: IFileDropProps) => {
  const [icon, setIcon] = useState<string>(upload);
  const [text, setText] = useState<string>(LOCAL_FILE_UPLOAD.heading);
  const [filteredFiles, setFilteredFiles] = useState<DriveFileData[]>([]);
  const [acceptedFile, setAcceptedFile] = useState<File>();

  const handleFileSelection = (acceptedFiles: File[]) => {
    setAcceptedFile(acceptedFiles[0]);
    setIcon(pdfLarge);
    setText(acceptedFiles[0]?.name);
  };

  const getFilesData = async () => {
    const response = await fileData();
    setFilteredFiles(response.files);
  };

  useEffect(() => {
    getFilesData();
  }, [acceptedFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelection,
  });

  function extractBaseFilename(filenames: string[]) {
    const baseFilenames = filenames.map((filename) => {
      const regex = /^(.*?)(?:\(\d+\))?(\.[^.]+)?$/;
      const match = regex.exec(filename);
      return match ? match[1] + (match[2] || "") : filename;
    });
    return baseFilenames;
  }

  function generateFileName(baseName: string, number: number) {
    const [name, extension = ""] = baseName.split(".");
    return `${name}(${number}).${extension}`;
  }

  const handleUpload = async (acceptedFile: File) => {
    const extractedFileNames = filteredFiles.map((file) => file.fileName);
    const extractedBaseFileNames = extractBaseFilename(extractedFileNames);
    const fileExists = extractedBaseFileNames.filter(
      (file) => file === acceptedFile.name
    );
    if (fileExists && fileExists.length > 0) {
      const newFileName = generateFileName(text, fileExists.length);
      setText(newFileName);
      onDuplicateFileUpload(acceptedFile, newFileName);
    } else {
      onFileUpload(acceptedFile.name);
      if (acceptedFile) {
        const response = await uploadFileFromLocal(acceptedFile, {
          userId: parseInt(localStorage.getItem("id") ?? "1"),
        });
        const notifyData = {
          createdAt: new Date(),
          action: LOCAL_FILE_UPLOAD.mockAction,
          userName: localStorage.getItem("name") ?? LOCAL_FILE_UPLOAD.mockName,
          fileName: response?.name,
        };
        notificationDetails(notifyData);
      }
    }
  };

  return (
    <InnerBox>
      <DropBox {...getRootProps()}>
        <Icon src={icon} />
        <MuiTypography
          text={text}
          typoVariant={!acceptedFile ? "subtitle2" : "body1"}
          color={theme.palette.text.white}
        />
      </DropBox>
      {!acceptedFile ? (
        <React.Fragment>
          <ChooseStyle
            variant={"outlined"}
            children={
              <label htmlFor="fileInput">
                <StyledTypography
                  text={LOCAL_FILE_UPLOAD.chooseButton}
                  typoVariant="body1"
                  color={theme.palette.text.white}
                />
              </label>
            }
          />
          <Input
            id="fileInput"
            data-testid="file-drop"
            type="file"
            {...getInputProps()}
          />
        </React.Fragment>
      ) : (
        <ChooseStyle
          data-testid="upload-file"
          variant="contained"
          children={
            <StyledTypography
              text={LOCAL_FILE_UPLOAD.uploadButton}
              typoVariant="body1"
              color={theme.palette.text.white}
            />
          }
          onClick={() => handleUpload(acceptedFile)}
        />
      )}
    </InnerBox>
  );
};

const DropBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  width: "content-fit",
});

const ChooseStyle = styled(Button)({
  width: "166px",
  height: "46px",
});

const InnerBox = styled(Box)({
  display: "flex",
  width: "648px",
  height: "304px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  gap: "40px",
});

const Input = styled("input")({
  display: "none",
});

const StyledTypography = styled(MuiTypography)({
  cursor: "pointer",
});

export default LocalFileUpload;
