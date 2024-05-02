import { Box, styled } from "@mui/material";
import { Icon } from "../../atoms/Icons";
import Pdf from "../../../../public/assets/icons/pdfIcon.svg";
import MuiTypography from "../../atoms/Typograpy";
import IconWithTypography from "../IconWithTypography";

interface FileCardProps {
  fileName: string;
  pdfImage: string;
  handleDoubleClick: () => void;
}

const StyledBox = styled(Box)({
  maxWidth: "18.125rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  cursor: "pointer",
});

export const FileCard = ({
  fileName,
  pdfImage,
  handleDoubleClick,
}: FileCardProps) => {
  return (
    <StyledBox onDoubleClick={handleDoubleClick} data-testid="pdf-file">
      <Icon src={pdfImage} alt="pdfImage" />
      <IconWithTypography
        IconComponent={<Icon src={Pdf} alt="pdfIcon" />}
        TextComponent={
          <MuiTypography
            text={fileName}
            typoVariant={"body1"}
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          />
        }
        gap={"0.75rem"}
        direction={"row"}
      />
    </StyledBox>
  );
};
