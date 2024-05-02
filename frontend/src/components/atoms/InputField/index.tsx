import React from "react";
import { InputAdornment, TextField, styled } from "@mui/material";
import theme from "../../../theme";
import { Icon } from "../Icons";

interface InputFieldProps {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: React.CSSProperties | object;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  adornment?: "start" | "end";
  src?: string;
  handleClick?: () => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  iconSx?: React.CSSProperties;
}

export const StyledInput = styled(TextField)({
  "& .MuiInputBase-root": {
    width: "356px",
    height: "45px",
  },
  "& .MuiOutlinedInput-input": {
    ...theme.typography.body2,
  },
});

const InputField = ({
  sx,
  placeholder,
  value,
  type,
  onChange,
  onFocus,
  onBlur,
  helperText,
  error,
  disabled,
  adornment,
  src,
  handleClick,
  iconSx,
  onClick,
}: InputFieldProps) => {
  const inputAdornmentPosition = adornment === "start" ? "start" : "end";

  return (
    <StyledInput
      data-testid="input-field"
      placeholder={placeholder}
      variant="outlined"
      value={value}
      type={type}
      onChange={onChange}
      sx={sx}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      helperText={helperText}
      error={error}
      disabled={disabled}
      InputProps={
        adornment
          ? {
              [inputAdornmentPosition + "Adornment"]: (
                <InputAdornment position={inputAdornmentPosition}>
                  <Icon
                    src={src}
                    alt="Image"
                    onClick={handleClick}
                    sx={iconSx}
                  />
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default InputField;
