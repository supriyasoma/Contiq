import React, { useState } from "react";
import { styled } from "@mui/system";
import theme from "../../../theme";
import Divider from "../../../../public/assets/icons/divider.svg";
import Google from "../../../../public/assets/icons/google.svg";
import { Box } from "@mui/material";
import MuiTypography from "../../atoms/Typograpy";
import EyeOpen from "../../../../public/assets/icons/openEye.svg";
import EyeClose from "../../../../public/assets/icons/eyeClose.svg";
import {
  DIVIDER_ALT,
  EMAIL,
  EMAIL_ERROR,
  EMAIL_PLACEHOLDER,
  ENTER_PASSWORD,
  FORGET_PASSWORD,
  GOOGLE_ALT,
  GOOGLE_CONTINUE,
  NO_ACCOUNT,
  PASSWORD_ERROR_TEXT,
  SIGNIN_TEXT,
  SIGNUP,
  VALIDPASSWORD,
  VALIDEMAIL,
} from "../../../utils/constants";
import CheckBox from "../../atoms/CheckBox";
import Button from "../../atoms/Button";
import InputField from "../../atoms/InputField";
import { Icon } from "../../atoms/Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchUserDataByEmail, logIn } from "../../../services";
import "react-toastify/dist/ReactToastify.css";

interface Formprops {
  email: string;
  password: string;
}

const SignInContainer = styled("div")({
  maxWidth: "35.3751rem",
  minHeight: "45rem",
  background: theme.palette.text.white,
  display: "flex",
  flexDirection: "column",
});

const StyledGoogleButton = styled("div")({
  maxWidth: "22.25rem",
  minHeight: "3rem",
  background: theme.palette.grays.gray600,
  borderRadius: "4px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "2.3125rem",
  justifyContent: "center",
  gap: "5px",
});

const TextContainer = styled("div")({
  display: "flex",
  marginTop: "28px",
  maxWidth: "22.25rem",
  justifyContent: "center",
});

const SectionWrapper = styled("div")({
  marginTop: "1.25rem",
  display: "flex",
  flexDirection: "column",
});

const OptionsWrapperSingIn = styled("div")({
  marginBottom: "0.5rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  maxWidth: "22.25rem",
  alignItems: "center",
});

const SignInStyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  maxWidth: theme.spacing(89),
});

const SignInStyle = {
  color: theme.palette.primary.main,
  cursor: "pointer",
  marginLeft: "2px",
};

const SignInButtonStyle = {
  padding: "13px 126px",
  maxWidth: "22.25rem",
  marginTop: "0.5rem",
  backgroundColor: theme.palette.primary.main,
  ":disabled": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.white,
  },
};

const SignInTextstyle = {
  marginTop: "60px",
  marginBottom: "12px",
};

const ErrorStyleSignIn = {
  color: "red",
  margin: "3px",
  maxWidth: "22.25rem",
};

const IconStyleIn = {
  maxWidth: "22.25rem",
  marginTop: "28px",
};

const ErrorFieldSignIn = (error: string) => (
  <MuiTypography typoVariant="caption1" text={error} style={ErrorStyleSignIn} />
);

const SignIn = () => {
  const { loginWithRedirect } = useAuth0();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<Formprops>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const navigate = useNavigate();

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setFormData({ ...formData, email: emailValue });
    if (!VALIDEMAIL.test(emailValue)) {
      setFormErrors({ ...formErrors, emailError: EMAIL_ERROR });
    } else {
      setFormErrors({ ...formErrors, emailError: "" });
    }
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordValue = e.target.value;
    setFormData({ ...formData, password: passwordValue });
    if (!VALIDPASSWORD.test(passwordValue)) {
      setFormErrors({ ...formErrors, passwordError: PASSWORD_ERROR_TEXT[0] });
    } else {
      setFormErrors({ ...formErrors, passwordError: "" });
    }
  };

  const isFormValid = () => {
    return (
      formData.email.length > 1 &&
      formData.password.length > 1 &&
      formErrors.emailError === "" &&
      formErrors.passwordError === ""
    );
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const authLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
    });
  };

  const handleForgot = () => {
    navigate("/forgot");
  };

  const handleSignIn = async () => {
    const response = await logIn(formData.email, formData.password);
    if (response) {
      const res = await fetchUserDataByEmail(formData.email);
      if (res) {
        localStorage.setItem("id", res.id);
        localStorage.setItem("name", res.name);
        localStorage.setItem("token",response);
        localStorage.setItem("email",res.email);
        navigate("/home");
      } else {
        toast.error("Invalid Credentials");
      }
    } else {
      toast.error("Invalid Credentials");
    }
    setFormData({ ...formData, email: "", password: "" });
  };

  return (
    <SignInContainer>
      <MuiTypography typoVariant="h2" text={SIGNIN_TEXT} sx={SignInTextstyle} />

      <SectionWrapper>
        <SignInStyledBox>
          <MuiTypography text={EMAIL} typoVariant={"body1"} />
          <InputField
            placeholder={EMAIL_PLACEHOLDER}
            value={formData.email}
            onChange={handleEmailInputChange}
            type={"text"}
          />
        </SignInStyledBox>
        {ErrorFieldSignIn(formErrors.emailError)}
      </SectionWrapper>

      <SectionWrapper>
        <SignInStyledBox>
          <MuiTypography text={"Password"} typoVariant={"body1"} />
          <InputField
            placeholder={ENTER_PASSWORD}
            type={showPassword ? "text" : "password"}
            iconSx={{ cursor: "pointer" }}
            adornment="end"
            handleClick={() => setShowPassword(!showPassword)}
            src={showPassword ? EyeOpen : EyeClose}
            value={formData.password}
            onChange={handlePasswordInputChange}
          />
        </SignInStyledBox>
        {ErrorFieldSignIn(formErrors.passwordError)}
      </SectionWrapper>
      <OptionsWrapperSingIn>
        <CheckBox
          label={
            <MuiTypography
              text={"Remember me"}
              typoVariant={"caption1"}
              color={theme.palette.text.lowEmphasis}
            />
          }
          disabled={true}
        />

        <MuiTypography
          typoVariant="caption1"
          text={FORGET_PASSWORD}
          style={{ color: theme.palette.primary.main }}
          onClick={handleForgot}
          sx={{ cursor: "pointer" }}
        />
      </OptionsWrapperSingIn>

      <Button
        variant="contained"
        data-testid={"signin"}
        sx={SignInButtonStyle}
        onClick={handleSignIn}
        disabled={!isFormValid()}
      >
        {SIGNIN_TEXT}
      </Button>

      <Icon src={Divider} alt={DIVIDER_ALT} sx={IconStyleIn} />

      <StyledGoogleButton>
        <Button
          data-testid="Google"
          variant={"text"}
          startIcon={<Icon src={Google} alt={GOOGLE_ALT} />}
          onClick={authLogin}
          sx={{
            color: theme.palette.text.black,
            "&:hover": {
              color: theme.palette.text.black,
            },
          }}
        >
          {<MuiTypography typoVariant="body1" text={GOOGLE_CONTINUE} />}
        </Button>
      </StyledGoogleButton>
      <TextContainer>
        <MuiTypography
          typoVariant="caption1"
          text={NO_ACCOUNT}
          style={{ color: theme.palette.text.mediumEmphasis }}
        />
        <MuiTypography
          typoVariant="caption1"
          text={SIGNUP}
          style={SignInStyle}
          onClick={handleSignUp}
        />
      </TextContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </SignInContainer>
  );
};

export default SignIn;
