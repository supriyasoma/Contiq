import theme from "../../../theme";
import MuiTypography from "../../atoms/Typograpy";
import success from "/public/assets/gifs/success.gif";
import { Icon } from "../../atoms/Icons";
import { Box, Stack, styled } from "@mui/material";
import { RESET_PASSWORD } from "../../../utils/constants";
import Button from "../../atoms/Button";

const SubHeading = styled(Box)({
  width: theme.spacing(61.5),
  height: theme.spacing(8),
});

const Heading = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(4),
  flexShrink: 0,
});

const StyledButton = styled(Button)({
  width: theme.spacing(89),
  height: theme.spacing(12),
});

interface ResetPasswordSuccessProps {
  handleContinue: () => void;
}
const ResetPasswordSuccess = (props: ResetPasswordSuccessProps) => {
  return (
    <Stack gap={8}>
      <Stack gap={1}>
        <Heading>
          <MuiTypography
            text={RESET_PASSWORD.heading}
            typoVariant={"h2"}
            color={theme.palette.text.black}
          />
          <Icon
            src={success}
            alt={RESET_PASSWORD.imageAltText}
            width={theme.spacing(6)}
            height={theme.spacing(6)}
          />
        </Heading>
        <SubHeading>
          <MuiTypography
            text={RESET_PASSWORD.subHeading}
            typoVariant={"overline1"}
            color={theme.palette.text.mediumEmphasis}
          />
        </SubHeading>
      </Stack>
      <StyledButton
        children={
          <MuiTypography
            text={RESET_PASSWORD.buttonText}
            typoVariant={"body1"}
          />
        }
        variant={"contained"}
        onClick={props.handleContinue}
      />
    </Stack>
  );
};

export default ResetPasswordSuccess;
