import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../theme";
import MuiTypography from "../../atoms/Typograpy";
import OpenEye from "../../../../public/assets/icons/openEye.svg";
import ClosedEye from "../../../../public/assets/icons/eyeClose.svg";
import Button from "../../atoms/Button";
import {
  ALREADY_ACCOUNT,
  CREATE_ACCOUNT,
  DIVIDER_ALT,
  EMAIL_ERROR,
  EMAIL_ID,
  EMAIL_PLACEHOLDER_TEXT,
  ENTER_PASSWORD,
  GOOGLE_ALT,
  GOOGLE_CONTINUE,
  NAME_ERROR,
  NAME_PLACEHOLDER,
  NAME_TEXT,
  PASSWORD_ERROR_TEXT,
  SIGNIN_TEXT,
  SIGNUP,
  USERNAME_REGEX,
  VALIDEMAIL,
  VALID_PASSWORD,
} from "../../../utils/constants";

import Google from "../../../../public/assets/icons/google.svg";
import divider from "../../../../public/assets/icons/divider.svg";
import InputField from "../../atoms/InputField";
import { Icon } from "../../atoms/Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpContainer = styled(Grid)({
  background: theme.palette.text.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const StyledGoogleButtonSignUp = styled("div")({
  width: theme.spacing(89),
  height: theme.spacing(12),
  background: theme.palette.grays.gray600,
  borderRadius: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: theme.spacing(9.1),
  justifyContent: "center",
});

const SignUpTextContainer = styled("div")({
  display: "flex",
  marginTop: theme.spacing(7),
  width: theme.spacing(89),
  justifyContent: "center",
});

const SingUpStyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  maxWidth: theme.spacing(89),
});

const SingUpCreateStyle = {
  padding: "13px 126px",
  width: theme.spacing(89),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  ":disabled": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.white,
  },
};

const SignUpStyle = {
  color: theme.palette.primary.main,
  cursor: "pointer",
  marginLeft: theme.spacing(0.5),
};
const SignUpSectionWrapper = styled("div")({
  marginBottom: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
});

const ErrorField = (error: string) => (
  <MuiTypography
    typoVariant="caption1"
    text={error}
    style={{
      color: "red",
      margin: "3px",
      maxWidth: theme.spacing(89),
    }}
  />
);
const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loginWithRedirect } = useAuth0();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
  });

  const navigate = useNavigate();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setFormData({ ...formData, name: nameValue });
    if (!USERNAME_REGEX.test(nameValue)) {
      setFormErrors({ ...formErrors, nameError: NAME_ERROR });
    } else {
      setFormErrors({ ...formErrors, nameError: "" });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setFormData({ ...formData, email: emailValue });
    if (!VALIDEMAIL.test(emailValue)) {
      setFormErrors({ ...formErrors, emailError: EMAIL_ERROR });
    } else {
      setFormErrors({ ...formErrors, emailError: "" });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setFormData({ ...formData, password: passwordValue });
    if (!VALID_PASSWORD.test(passwordValue)) {
      setFormErrors({ ...formErrors, passwordError: PASSWORD_ERROR_TEXT[0] });
    } else {
      setFormErrors({ ...formErrors, passwordError: "" });
    }
  };

  const isFormValid = () => {
    const { emailError, passwordError } = formErrors;
    const { name, email, password } = formData;
    return (
      emailError === "" &&
      passwordError === "" &&
      name.length > 2 &&
      email.length > 1 &&
      password.length > 1
    );
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = async () => {
    const response = await addUser(
      formData.email,
      formData.name,
      formData.password
    );
    if (response) {
      localStorage.setItem("id", response.id);
      localStorage.setItem("name", response.name);
      navigate("/login");
      toast.success("User added successfully. Please login");
    } else {
      toast.error("Already account exists");
    }
    setFormData({ ...formData, name: "", email: "", password: "" });
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const authLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
    });
  };

  return (
    <SignUpContainer>
      <MuiTypography
        text={SIGNUP}
        sx={{ marginBottom: "30px" }}
        typoVariant={"h2"}
      />
      <SignUpSectionWrapper>
        <SingUpStyledBox>
          <MuiTypography text={NAME_TEXT} typoVariant={"body1"} />
          <InputField
            placeholder={NAME_PLACEHOLDER}
            value={formData.name}
            type={"text"}
            onChange={handleNameInputChange}
          />
        </SingUpStyledBox>
        {ErrorField(formErrors.nameError)}
      </SignUpSectionWrapper>
      <SignUpSectionWrapper>
        <SingUpStyledBox>
          <MuiTypography text={EMAIL_ID} typoVariant={"body1"} />
          <InputField
            placeholder={EMAIL_PLACEHOLDER_TEXT}
            value={formData.email}
            onChange={handleEmailChange}
            type="text"
          />
        </SingUpStyledBox>
        {ErrorField(formErrors.emailError)}
      </SignUpSectionWrapper>

      <SignUpSectionWrapper>
        <SingUpStyledBox>
          <MuiTypography text={"Password"} typoVariant={"body1"} />
          <InputField
            placeholder={ENTER_PASSWORD}
            value={formData.password}
            onChange={handlePasswordChange}
            adornment="end"
            src={showPassword ? OpenEye : ClosedEye}
            type={showPassword ? "text" : "password"}
            handleClick={handleClickShowPassword}
          />
        </SingUpStyledBox>
        {ErrorField(formErrors.passwordError)}
      </SignUpSectionWrapper>
      <Button
        variant="contained"
        sx={SingUpCreateStyle}
        disabled={!isFormValid()}
        onClick={handleSignUp}
      >
        {CREATE_ACCOUNT}
      </Button>
      <Icon
        src={divider}
        alt={DIVIDER_ALT}
        sx={{ width: theme.spacing(89), marginTop: theme.spacing(7) }}
      />
      <StyledGoogleButtonSignUp>
        <Button
          data-testid="Google"
          variant="text"
          sx={{
            color: theme.palette.text.black,
            "&:hover": {
              color: theme.palette.text.black,
            },
          }}
          startIcon={<Icon src={Google} alt={GOOGLE_ALT} />}
          onClick={authLogin}
        >
          {<MuiTypography typoVariant="body1" text={GOOGLE_CONTINUE} />}
        </Button>
      </StyledGoogleButtonSignUp>
      <SignUpTextContainer>
        <MuiTypography
          typoVariant="caption1"
          text={ALREADY_ACCOUNT}
          style={{ color: theme.palette.text.mediumEmphasis }}
        />

        <MuiTypography
          typoVariant="caption1"
          text={SIGNIN_TEXT}
          style={SignUpStyle}
          onClick={handleSignIn}
        />
      </SignUpTextContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </SignUpContainer>
  );
};

export default SignUp;
