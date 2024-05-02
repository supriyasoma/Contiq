import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/system";
import PdfImage from "/public/assets/icons/pdfLarge.svg";
import theme from "../../../theme";
import { Icon } from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typograpy";
import { LinearProgress } from "@mui/material";
import { PROGRESS_BAR_MODAL } from "../../../utils/constants";

export interface ProgressBarModalProps {
  fileName: string;
}
const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  flexDirection: "column",
});

const MainContainer = styled(Box)({
  textAlign: "center",
});

const LoaderContainer = styled(Box)({
  textAlign: "center",
  paddingTop: "30px",
});

const StyledTypography = styled(MuiTypography)({
  marginLeft: "275px",
});

const StyledLinearProgess = styled(LinearProgress)({
  height: "8px",
  borderRadius: "5px",
  backgroundColor: "#D7DFE9",
  "& .MuiLinearProgress-bar": {
    backgroundColor: theme.palette.primary.dark,
  },
});

const ProgressBarModal = ({ fileName }: ProgressBarModalProps) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 200);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <StyledBox>
      <Icon src={PdfImage} />
      <MuiTypography
        color={theme.palette.text.white}
        text={fileName}
        typoVariant={"body1"}
      />
      <MainContainer>
        <LoaderContainer>
          <StyledLinearProgess
            data-testid="progress-bar"
            value={progress}
            variant="determinate"
          />
        </LoaderContainer>
        <StyledTypography
          data-testid="Uploading-text"
          color={theme.palette.text.highEmphasis}
          text={PROGRESS_BAR_MODAL}
          typoVariant={"caption1"}
        />
      </MainContainer>
    </StyledBox>
  );
};

export default ProgressBarModal;
