import { Box, IconButton, styled } from "@mui/material";
import theme from "../../../theme";
import MuiTypography from "../../atoms/Typograpy";
import { Icon } from "../../atoms/Icons";
import plus from "/public/assets/icons/plus.svg";
import minus from "/public/assets/icons/minus.svg";
interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  zoomValue: number;
  zoomIn: (zoomValue: number) => void;
  zoomOut: (zoomValue: number) => void;
}
const OuterBox = styled(Box)({
  width: "fit-content",
  background: theme.palette.grays.gray400,
  borderRadius: theme.spacing(2),
  display: "inline-flex",
  padding: `${theme.spacing(2)} ${theme.spacing(7.5)}`,
  alignItems: "center",
  gap: theme.spacing(15.75),
});
const InnerBox = styled(Box)({
  width: "fit-content",
  height: theme.spacing(9),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2.5),
  borderRadius: theme.spacing(2.5),
  background: theme.palette.grays.gray300,
});
const StyledIcon = styled(Icon)({
  cursor: "pointer",
});
const Pagination = ({
  currentPage,
  totalPages,
  zoomValue,
  zoomIn,
  zoomOut,
}: PaginationProps) => {
  const handleZoomOut = () => {
    zoomOut(zoomValue);
  };
  const handleZoomIn = () => {
    zoomIn(zoomValue);
  };

  return (
    <OuterBox>
      <MuiTypography
        text={`Page ${currentPage} of ${totalPages}`}
        typoVariant={"body1"}
        color={theme.palette.text.highEmphasis}
      />
      <InnerBox>
        <IconButton onClick={handleZoomIn} data-testid="zoom-in">
          <StyledIcon
            src={minus}
            alt={"minus"}
            height={theme.spacing(6)}
            width={theme.spacing(6)}
          />
        </IconButton>
        <MuiTypography
          text={`${zoomValue}%`}
          typoVariant={"body1"}
          color={theme.palette.text.white}
        />
        <IconButton onClick={handleZoomOut} data-testid="zoom-out">
          <StyledIcon
            src={plus}
            alt={"plus"}
            height={theme.spacing(6)}
            width={theme.spacing(6)}
          />
        </IconButton>
      </InnerBox>
    </OuterBox>
  );
};
export default Pagination;
