import React, { useState } from "react";
import SignInTemplate from "../../components/template/SignInTemplate";
import SigninImage from "/public/assets/images/leftContainer.png";
import { CreateNewPassword } from "../../components/organisms/CreateNewPassword";
import { Box, styled } from "@mui/material";
import ResetPasswordSuccess from "../../components/molecules/ResetPasswordSuccess";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled(Box)({
  position: "absolute",
  top: "15%",
  left: "62%",
});
const ForgotPassword = () => {
  const [reset, setReset] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleResetPassword = async (email: string, password: string) => {
    const res = await updateUserPassword(
      parseInt(localStorage.getItem("id") ?? "1"),
      password
    );
    if (res) {
      setReset(true);
    } else {
      toast.error("Same as previous password");
    }
  };

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <SignInTemplate
      image={SigninImage}
      data={
        <Container>
          {reset ? (
            <ResetPasswordSuccess handleContinue={handleContinue} />
          ) : (
            <CreateNewPassword handleResetPassword={handleResetPassword} />
          )}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </Container>
      }
    />
  );
};

export default ForgotPassword;
