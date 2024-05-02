import React, { SyntheticEvent } from "react";
import {
  Snackbar as MuiSnackbar,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import CloseIcon from "/public/assets/icons/CloseIconWhite.svg";
import CopyIcon from "/public/assets/icons/copyIcon.svg";
import CompleteIcon from "/public/assets/icons/complete.svg";
import theme from "../../../theme";
import { Icon } from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typograpy";
import { fileCopied } from "../../../utils/constants";

interface SnackbarProps {
  topPosition: string;
  open: boolean;
  handleClick: (event: Event | SyntheticEvent<any, Event>) => void;
  handleClose: (event: Event | SyntheticEvent<any, Event>) => void;
}

const CustomSnackbar = styled(MuiSnackbar)(
  ({ topPosition }: { topPosition: string }) => ({
    position: "absolute",
    top: topPosition,
    "& .MuiSnackbarContent-root": {
      minWidth: "12.5rem",
      borderRadius: "0.25rem",
      background: theme.palette.grays.gray400,
    },
  })
);

const Snackbar = ({
  topPosition,
  open,
  handleClick,
  handleClose,
}: SnackbarProps) => {
  const action = (
    <IconButton
      onClick={handleClose}
      sx={{
        paddingRight: "0.625rem",
      }}
    >
      <Icon src={CloseIcon} alt="closeIcon" />
    </IconButton>
  );

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon src={CopyIcon} alt="copyIcon" />
      </IconButton>

      <CustomSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <Stack
            direction="row"
            alignItems="center"
            sx={{ gap: "0.625rem", height: "0.625rem" }}
          >
            <Icon src={CompleteIcon} alt="completeIcon" />
            <MuiTypography text={fileCopied} typoVariant="body1" />
          </Stack>
        }
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        topPosition={topPosition}
      />
    </>
  );
};

export default Snackbar;
