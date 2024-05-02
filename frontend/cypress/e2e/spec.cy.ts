import {
  LocalUploadEyes,
  LocalUploadHands,
} from "../robots/AddFiles/upload";
import {
  FillLogInDependencies,
  FillLogInFormRobotEyes,
  FillLogInFormRobotHands,
} from "../robots/Login/login";
import {
  FillSignUpDependencies,
  FillSignUpFormRobotEyes,
  FillSignUpFormRobotHands,
} from "../robots/SignUp/signUp";

context("Checking the flow of the ContiqApplication", () => {
  const signUpEyes = new FillSignUpFormRobotEyes();
  const signUpDependencies = new FillSignUpDependencies();
  const signUpHands = new FillSignUpFormRobotHands();
  const logInEyes = new FillLogInFormRobotEyes();
  const logInHands = new FillLogInFormRobotHands();
  const logInDependencies = new FillLogInDependencies();
  const localUploadEyes = new LocalUploadEyes();
  const localUploadHands = new LocalUploadHands();

  describe("Signing Up into the Application", () => {
    it("Signing Up into the application", () => {
      signUpDependencies.visitSignUpPage();
      signUpEyes.seesElementWithText("Sign Up");
      signUpHands.signUpEmail();
    });
  });
  describe("Login In Flow of Contiq Application", () => {
    it("Existing User is logging into the account", () => {
      logInDependencies.visitLoginPage();
      logInEyes.seesElementWithText("Sign In");
      logInHands.logInEmail();
      logInEyes.seesElementWithText("Home");
      logInEyes.seesPathNameInUrl("/home");
      localUploadHands.localUpload();
      localUploadEyes.seesElementWithText("Files");
      localUploadHands.fileRender();
      localUploadHands.searchKeyWord();
      localUploadEyes.seesPathNameInUrl("/");
    });
  });
  describe("Forgot Password", () => {
    it("Updating Password of the User",()=>{
      logInDependencies.visitLoginPage();
      logInEyes.seesElementWithText("Remember me");
      logInHands.forgetPassword();
    })
  });
});
