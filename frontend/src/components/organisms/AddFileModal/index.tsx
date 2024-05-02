import { Box, IconButton, Modal, styled } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../theme";
import IconWithTypography from "../../molecules/IconWithTypography";
import { Icon } from "../../atoms/Icons";
import BackIcon from "/public/assets/icons/back.svg";
import CloseIcon from "/public/assets/icons/CloseIconWhite.svg";
import AddIcon from "/public/assets/icons/add.svg";
import MuiTypography from "../../atoms/Typograpy";
import Tabs from "../../atoms/Tabs";
import Button from "../../atoms/Button";
import FileUpload from "../../molecules/FileUpload";
import { tabsTwo } from "../../../utils/constants";

interface CustomModalProps {
  UploadBody?: React.ReactNode;
  CloudBody?: React.ReactNode;
  isUploaded: boolean;
  modalTitle?: string;
  tabs: boolean;
  Content?: React.ReactNode;
  handleUpload?: () => void;
  handleCancel?: () => void;
  fileName: string;
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

const ModalHeader = styled(Box)(
  ({ headerTitle }: { headerTitle: boolean }) => ({
    display: "flex",
    justifyContent: headerTitle ? "space-between" : "flex-end",
    padding: "25px 20px",
    borderBottom: headerTitle
      ? `0.0625rem solid ${theme.palette.grays.gray300}`
      : "none",
    marginBottom: "0.625rem",
  })
);

const ModalBodyContainer = styled(Box)({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `0.0625rem solid ${theme.palette.grays.gray200}`,
  borderRadius: "0.625rem",
  borderStyle: "dashed",
  borderWidth: "0.125rem",
  borderImage:
    "repeating-linear-gradient(45deg, grey,grey 0.8125rem,transparent 0.8125rem,transparent 1.25rem) 1",
  margin: "1.75rem",
  height: "100%",
});

const CustomButton = styled(Button)({
  width: theme.spacing(30),
  height: theme.spacing(9),
  padding: "0.375rem 0.5rem",
  alignItems: "center",
});

const AddFileModal = ({
  UploadBody,
  CloudBody,
  tabs,
  modalTitle,
  Content,
  isUploaded,
  handleCancel,
  handleUpload,
  fileName,
}: CustomModalProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabsTwo[0].label);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

 const handleClose = () => {
    setOpen(false);
    window.location.reload(); 
  };

  const handleSelectTab = (activeTab: string) => {
    setSelectedTab(activeTab);
  };

  return (
    <React.Fragment>
      <CustomButton
        variant="contained"
        children={<MuiTypography text="Add files" typoVariant="body1" />}
        startIcon={
          <Icon
            src={AddIcon}
            width={theme.spacing(6)}
            height={theme.spacing(6)}
            alt={"Add Icon"}
          />
        }
        onClick={handleOpen}
      />
      <Modal open={open}>
        {isUploaded ? (
          <ModalContainer>
            <ModalHeader headerTitle={Boolean(modalTitle)}>
              {modalTitle ? (
                <IconWithTypography
                  IconComponent={
                    <IconButton
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      onClick={handleClose}
                    >
                      <Icon src={BackIcon} alt="BackIcon" />
                    </IconButton>
                  }
                  TextComponent={
                    <MuiTypography
                      text={modalTitle}
                      typoVariant="h3"
                      sx={{ color: theme.palette.text.white }}
                    />
                  }
                  gap="0.9375rem"
                  direction="row"
                />
              ) : null}
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={handleClose}
                data-testid="close-icon"
              >
                <Icon src={CloseIcon} alt="CloseIcon" />
              </IconButton>
            </ModalHeader>
            <React.Fragment>
            {tabs ? (
              <React.Fragment>
                <Tabs
                  tabs={tabsTwo}
                  activeTabColor={`${theme.palette.text.white}`}
                  inactiveTabColor={`${theme.palette.grays.gray200}`}
                  backgroundColor={`${theme.palette.grays.gray400}`}
                  width="100%"
                  onTabSelect={handleSelectTab}
                />

                <ModalBodyContainer>
                  {selectedTab === "Uploads" ? UploadBody : CloudBody}
                </ModalBodyContainer>
              </React.Fragment>
            ) : (
              Content
            )}
            </React.Fragment>
          </ModalContainer>
        ) : (
          <FileUpload
            uploaddocument={fileName}
            handleCancel={handleCancel}
            handleUpload={handleUpload}
            data-testid="already-exists"
          />
        )}
      </Modal>
    </React.Fragment>
  );
};

export default AddFileModal;
