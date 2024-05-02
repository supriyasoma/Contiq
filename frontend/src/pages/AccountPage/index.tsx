import React from "react";
import SignInTemplate from "../../components/template/SignInTemplate";
import SigninImage from "../../../public/assets/images/leftContainer.png";
import SignIn from "../../components/organisms/SignIn";
import SignUp from "../../components/organisms/SignUp";

interface AccountPageProps {
  type: "login" | "signup";
}

const AccountPage = ({ type }: AccountPageProps) => {
  let dataBody;

  dataBody = type === "login" ? <SignIn /> : <SignUp />;

  return <SignInTemplate image={SigninImage} data={dataBody} />;
};

export default AccountPage;
