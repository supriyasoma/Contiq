import { Box, Stack, styled } from "@mui/material";
import MuiTypography from "../../atoms/Typograpy";
import InputField from "../../atoms/InputField";
import Button from "../../atoms/Button";
import theme from "../../../theme";
import React, { useState } from "react";
import {
  CREATE_NEW_PASSWORD,
  VALIDEMAIL,
  VALIDPASSWORD,
} from "../../../utils/constants";
import { fetchUserDataByEmail } from "../../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EyeOpen from "../../../../public/assets/icons/openEye.svg";
import EyeClose from "../../../../public/assets/icons/eyeClose.svg";

const StyledBox = styled(Box)({
  width: "370px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

const SubHeading = styled(Box)({
  width: theme.spacing(61.5),
  height: theme.spacing(8),
});

const StyledButton = styled(Button)({
  width: "356px",
  height: "48px",
});

interface Props {
  handleResetPassword: (email: string, password: string) => void;
}

export const CreateNewPassword = ({ handleResetPassword }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(VALIDEMAIL.test(newEmail));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(VALIDPASSWORD.test(newPassword));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsConfirmPasswordValid(VALIDPASSWORD.test(newConfirmPassword));
  };

  const handleEmailButtonClick = async () => {
    const userData = await fetchUserDataByEmail(email);
    if (userData) {
      localStorage.setItem("id", userData.id);
      localStorage.setItem("name", userData.name);
      setFormOpen(true);
    } else {
      setFormOpen(false);
      toast.error("Email is not existed");
    }
  };

  const isPasswordError = () => {
    return (
      !isConfirmPasswordValid ||
      (confirmPassword !== password && confirmPassword.length > 0)
    );
  };

  const getPasswordHelperText = () => {
    return isPasswordError() ? "Password does not match" : "";
  };

  const isEmailButtonDisabled = !isEmailValid;
  const isResetPasswordButtonDisabled =
    !isPasswordValid || !isConfirmPasswordValid || password !== confirmPassword;

  return (
    <StyledBox>
      {!formOpen && (
        <>
          <Stack direction={"column"} spacing={1}>
            <MuiTypography
              text={CREATE_NEW_PASSWORD.resetPasswordTitle}
              typoVariant={"h2"}
              color={theme.palette.text.black}
            />
            <SubHeading>
              <MuiTypography
                text={CREATE_NEW_PASSWORD.resetPasswordSubtitle}
                typoVariant={"overline1"}
                color={theme.palette.text.mediumEmphasis}
              />
            </SubHeading>
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <MuiTypography
              text={CREATE_NEW_PASSWORD.email}
              typoVariant={"body1"}
              color={theme.palette.text.black}
            />
            <InputField
              placeholder={CREATE_NEW_PASSWORD.emailTextField}
              value={email}
              onChange={handleEmailChange}
              error={!isEmailValid}
              helperText={
                !isEmailValid ? CREATE_NEW_PASSWORD.emailErrorMessage : ""
              }
            />
          </Stack>
          <StyledButton
            variant="contained"
            children={CREATE_NEW_PASSWORD.sendButton}
            disabled={isEmailButtonDisabled}
            onClick={handleEmailButtonClick}
          />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </>
      )}
      {formOpen && (
        <>
          <Stack direction={"column"} spacing={1}>
            <MuiTypography
              text={CREATE_NEW_PASSWORD.createPasswordTitle}
              typoVariant={"h2"}
              color={theme.palette.text.black}
            />
            <SubHeading>
              <MuiTypography
                text={CREATE_NEW_PASSWORD.createPasswordSubtitle}
                typoVariant={"overline1"}
                color={theme.palette.text.mediumEmphasis}
              />
            </SubHeading>
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <MuiTypography
              text={CREATE_NEW_PASSWORD.password}
              typoVariant={"body1"}
              color={theme.palette.text.black}
            />
            <InputField
              placeholder={CREATE_NEW_PASSWORD.passwordTextField}
              type={showPassword ? "text" : "password"}
              adornment="end"
              handleClick={() => setShowPassword(!showPassword)}
              src={showPassword ? EyeOpen : EyeClose}
              iconSx={{ cursor: "pointer" }}
              value={password}
              onChange={handlePasswordChange}
              error={!isPasswordValid}
              helperText={
                !isPasswordValid ? CREATE_NEW_PASSWORD.passwordErrorMessage : ""
              }
            />
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <MuiTypography
              text={CREATE_NEW_PASSWORD.confirmPassword}
              typoVariant={"body1"}
              color={theme.palette.text.black}
            />
            <InputField
              placeholder={CREATE_NEW_PASSWORD.confirmPasswordTextField}
              type={showConfirmPassword ? "text" : "password"}
              adornment="end"
              handleClick={() => setShowConfirmPassword(!showConfirmPassword)}
              src={showConfirmPassword ? EyeOpen : EyeClose}
              iconSx={{ cursor: "pointer" }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={isPasswordError()}
              helperText={getPasswordHelperText()}
            />
          </Stack>
          <StyledButton
            variant="contained"
            children={CREATE_NEW_PASSWORD.resetButton}
            disabled={isResetPasswordButtonDisabled}
            onClick={() => handleResetPassword(email, password)}
          />
        </>
      )}
    </StyledBox>
  );
};
