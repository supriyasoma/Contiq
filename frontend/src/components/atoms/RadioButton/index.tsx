import { Radio, RadioProps, styled } from "@mui/material";
import theme from "../../../theme";

const StyledRadio = styled(Radio)({
  "&.Mui-checked": {
    color: theme.palette.text.white,
  },
  "&:not(.Mui-checked)": {
    color: theme.palette.text.mediumEmphasis,
  },
});

export const CustomRadio = (props: RadioProps) => {
  return <StyledRadio data-testid="radio" {...props} />;
};
