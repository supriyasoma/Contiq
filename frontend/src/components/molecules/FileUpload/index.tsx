import styled from "@emotion/styled";
import { Grid, Stack } from "@mui/material";
import theme from "../../../theme";
import MuiTypography from "../../atoms/Typograpy";
import {
  CANCEL_BUTTON,
  UPLOAD,
  UPLOAD_BUTTON,
  UPLOAD_CONTENT,
} from "../../../utils/constants";
import Button from "../../atoms/Button";
export interface FileUploadProps {
  uploaddocument: string;
  handleCancel?: () => void;
  handleUpload?: () => void;
}

const OuterGrid = styled(Grid)({
  width: theme.spacing(121),
  padding: "26px",
  backgroundColor: theme.palette.grays.gray400,
  display: "flex",
  flexDirection: "column",
  height: "auto",
  boxShadow: "none",
  borderRadius: "4px",
  gap: "24px",
  position:"absolute",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
const ButtonGrid = styled(Grid)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",

  height: "100%",
  "& > button:first-child": {
    marginRight: "10px",
  },
});
const CancelButton = styled(Button)({
  background: theme.palette.grays.gray400,
  border: "1px solid white",
  width: "inherit",
  height: "36px",
});
const UploadButton = styled(Button)({
  background: "#8B3DFF",
  width: "86px",
  height: "36px",
});
const MuiTypographyStack = styled(Stack)({
  display: "flex",
  gap: "12px",
});
const TypographyUpload = styled(MuiTypography)({
  color: theme.palette.text.white,
});

const MidContainer = styled(Grid)({
  display: "flex",
  marginRight: "7px",
});
const TypographyCancel = styled(MuiTypography)({
  color: theme.palette.text.white,
  textTransform: "none",
});

const MidTypography = styled(MuiTypography)({
  color: theme.palette.text.highEmphasis,
});

const SpanTypography = styled('span')({
  color: theme.palette.text.white ,
});
const FileUpload = ({
  handleCancel,
  handleUpload,
  uploaddocument,
}: FileUploadProps) => {
  return (
    <OuterGrid>
      <MuiTypographyStack>
        <TypographyUpload text={UPLOAD} typoVariant="h3" />
        <MidContainer>
          <MidTypography
            text={
              <div>
                <SpanTypography>
                  {uploaddocument}
                </SpanTypography>{" "}
                {UPLOAD_CONTENT}
              </div>
            }
            typoVariant="subtitle2"
          />
        </MidContainer>
      </MuiTypographyStack>
      <ButtonGrid>
        <CancelButton
          variant="outlined"
          onClick={handleCancel}
          children={
            <TypographyCancel text={CANCEL_BUTTON} typoVariant={"body1"} />
          }
        />
        <UploadButton
          variant="contained"
          onClick={handleUpload}
          children={
            <TypographyCancel text={UPLOAD_BUTTON} typoVariant={"body1"} />
          }
        />
      </ButtonGrid>
    </OuterGrid>
  );
};

export default FileUpload;
