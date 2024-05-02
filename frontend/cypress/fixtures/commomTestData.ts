export const testData = {
  logIn: {
    email: "supriya@gmail.com",
    password: "Supriya@2001",
  },
  urls: {
    loginPage: "https://bc130-fe.real-world.tk/login",
  },
  placeholders: {
    logInEmail: '[placeholder="john@example.com"]',
    createPassword: '[placeholder="Create a password"]',
    enterEmail: '[placeholder="Enter your email"]',
    enterNewPassword: '[placeholder="Enter new password"]',
    reEnterPassword: '[placeholder="Re-enter password"]',
  },
  testIds: {
    signInButton: '[data-testid="signin"]',
  },
  text: {
    forgotPassword: "Forgot",
    resetPassword: "Reset your password",
    sendButton: "Send",
    createNewPassword: 'Create new password',
    resetPasswordButton: "Reset Password",
    continueButton: "Continue",
    signInText: "Sign In",
  },
};

export const signUpData ={
  fullName:"CypressTester",
  email:"test0212@gmail.com",
  password:"Test13@232",
  signUpPage: {
    url: "https://bc130-fe.real-world.tk/signup",
  },
  signUpPlaceholders: {
    fullName: '[placeholder="Kane Williamson"]',
    email: '[placeholder="kane@gmail.com"]',
    createPassword: '[placeholder="Create a password"]',
  },
  signUpButton: {
    class: '.MuiButton-contained',
  },
}

export const fileRenderConstants = {
  WAIT_TIME: 2000,
  START_DATE: "Start Date",
  END_DATE: "End Date",
  PUBLISH_SETTING: "Publish Setting",
  PUBLISHED_BY_ME: "Published by me",
  FILE_TYPE: "File type",
  PDF: "PDF",
  PDF_IMAGE_ALT: "pdfImage",
  ZOOM_IN_TEST_ID: "zoom-in",
  ZOOM_OUT_TEST_ID: "zoom-out",
  BACK_ICON_ALT: "BackIcon",
  FILE_PAGE_URL_PARTIAL: "/file",
  AVATAR_IMG_CLASS: ".MuiAvatar-img",
  LOGOUT_TEXT: "Logout",
  SEARCH_INPUT_SELECTOR: '[placeholder="Search"]',
  FIRST_LIST_ITEM_SELECTOR: '.MuiListItem-root',
  EXPAND_ICON_SELECTOR: '.MuiAccordionSummary-expandIconWrapper',
  DOWN_ARROW_SELECTOR: '[alt="down-arrow"]',
  KEYWORD_COMPILE: "compile",
};

export const upload = {
  waitTimes: {
    short: 2000,
    long: 4000,
  },
  filePath: "cypress/fixtures/files/sample.pdf",
  addFilesText: "Add files",
  uploadFilesText: "Upload Files",
  closeIconTestId: 'close-icon',
  filesButtonText: "Files",
  dropFilesHereText: "Drop your files here",
};
