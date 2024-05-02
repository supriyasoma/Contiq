import {
  Button as MuiButton,
  ButtonProps,
  styled,
} from "@mui/material";
import theme from "../../../theme";

interface MuiButtonProps extends ButtonProps{
  variant?:"text"|"contained"|"outlined"
}

const StyledButton = styled(MuiButton)(
  ({
    buttonVariant,
  }: {
    buttonVariant?: string;
  }) => ({
    textTransform: "none",
    background:
      buttonVariant === "contained"
        ? theme.palette.primary.main
        : "transparent",
    color: theme.palette.text.white,
    borderColor:
      buttonVariant === "outlined" ? theme.palette.grays.gray100 : "none",
    "&:hover": {
      background:
        buttonVariant === "contained"
          ? theme.palette.primary.main
          : "transparent",
      color: theme.palette.text.white,
      borderColor:
        buttonVariant === "outlined" ? theme.palette.grays.gray100 : "none",
    },
    ...(buttonVariant === "contained" && {
      "&.Mui-disabled": {
        background: theme.palette.primary.light,
        color: theme.palette.text.white,
      },
    }),
  })
);

const Button = (props: MuiButtonProps) => {
  return (
    <StyledButton
      buttonVariant={props.variant}
      {...props}
      disableRipple
      disableElevation
    />
  );
};

export default Button;
