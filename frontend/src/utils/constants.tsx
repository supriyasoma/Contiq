import home from "/public/assets/icons/home.svg";
import homeActive from "/public/assets/icons/homeActive.svg";
import office from "/public/assets/icons/office.svg";
import people from "/public/assets/icons/people.svg";
import calender from "/public/assets/icons/calender.svg";
import file from "/public/assets/icons/files.svg";
import fileActive from "/public/assets/icons/fileActive.svg";
import metrics from "/public/assets/icons/metrics.svg";
import ProfileIcon from "/public/assets/icons/profile.svg";
import SettingsIcon from "/public/assets/icons/settingIcon.svg";
import LogoutIcon from "/public/assets/icons/logout.svg";
import Agreement from "../../public/assets/images/fileCard.svg";
import { ITabData } from "../components/atoms/Tabs";

export const fileTypeOptions = ["PDF", "PPT", "Image"];

export const publishOptions = [
  "Published by me",
  "Published by Sales team",
  "Published by others",
];

export const fileCopied = "Text copied";
export const RESET_PASSWORD = {
  heading: "Password reset",
  imageAltText: "correct",
  subHeading:
    "Your password has been successfully reset. Click below to login magically.",
  buttonText: "Continue",
};

export const SIDEBAR = [
  {
    icon: home,
    text: "Home",
    activeSrc: homeActive,
  },
  {
    text: "Office",
    activeSrc: office,
    icon: office,
  },
  {
    text: "People",
    activeSrc: people,
    icon: people,
  },
  {
    text: "Calendar",
    activeSrc: calender,
    icon: calender,
  },
  {
    text: "Files",
    activeSrc: fileActive,
    icon: file,
  },
  {
    text: "Metrics",
    activeSrc: metrics,
    icon: metrics,
  },
];
export const SYNC_PROGRESS = {
  heading: "Sync in progress",
  subHeading: "Closing this window will not interrupt your sync",
  closeAltText: "close",
  driveAltText: "drive",
  circleAltText: "circle",
};
export const FORGET_PASSWORD = "Forgot password?";
export const CHECKBOX_LABEL = "Remember me";
export const VALIDPASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
export const EMAIL = "Email";
export const EMAIL_PLACEHOLDER = "john@example.com";
export const SEND = "Send";

export const EMAIL_ERROR = "Invalid email address";
export const ENTER_PASSWORD = "Create a password";
export const SIGNUP = "Sign Up";
export const NO_ACCOUNT = "Doesn’t have an account?    ";
export const GOOGLE_ALT = "Google Login Button";
export const GOOGLE_CONTINUE = "Continue with google";
export const DIVIDER_ALT = "Divider";
export const SIGNIN_TEXT = "Sign In";
export const VALIDEMAIL = /^[a-zA-Z0-9._%+-]+@(gmail\.com|zemosolabs\.com)$/;
export const PASSWORD_ERROR_TEXT = [
  "password must contain 8 characters with at least one uppercase, one lowercase, one special character, and a number",
  "passwords are not matching",
];
export const ALREADY_ACCOUNT = "Already have an account?   ";
export const CREATE_ACCOUNT = "Create account";
export const VALID_PASSWORD =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
export const USERNAME_REGEX = /^[a-zA-Z]{3,50}$/;
export const NAME_ERROR = "User name should have minimum 3 characters";
export const NAME_PLACEHOLDER = "Kane Williamson";
export const NAME_TEXT = "Name";
export const EMAIL_ID = "Email ID";

export const EMAIL_PLACEHOLDER_TEXT = "kane@gmail.com";
export const UPLOAD_CONTENT =
  "already exists in this location. Do you want to replace the existing file with a new version or keep both files?";
export const UPLOAD = "Upload options";
export const UPLOAD_BUTTON = "Upload";
export const CANCEL_BUTTON = "Cancel";
export const logoutOptions = {
  Profile: ProfileIcon,
  Settings: SettingsIcon,
  Logout: LogoutIcon,
};

export const mockNotifications = [
  {
    name: "Amit",
    userAction: "uploaded",
    fileName: "company agreement.pdf ",
    dateTime: "20 June 10:30 AM",
  },
  {
    name: "John",
    userAction: "uploaded",
    fileName: "company agreement.pdf ",
    dateTime: "22 July 11:30 AM",
  },
  {
    name: "Grace",
    userAction: "deleted",
    fileName: "company profile.pdf ",
    dateTime: "11 April 10:25 PM",
  },
  {
    name: "Sai",
    userAction: "deleted",
    fileName: "company agreement.pdf ",
    dateTime: "11 August 7:25 PM",
  },
  {
    name: "Ram",
    userAction: "delelted",
    fileName: "company agreement.pdf ",
    dateTime: "11 August 7:25 PM",
  },
  {
    name: "Vimal",
    userAction: "updated",
    fileName: "company agreement.pdf ",
    dateTime: "16 April 4:25 AM",
  },
  {
    name: "Arun",
    userAction: "updated",
    fileName: "company Presentation.pdf ",
    dateTime: "10 October 4:25 AM",
  },
  {
    name: "Amit",
    userAction: "uploaded",
    fileName: "company agreement.pdf ",
    dateTime: "20 June 8:30 AM",
  },
  {
    name: "Amit",
    userAction: "deleted",
    fileName: "company agreement.pdf ",
    dateTime: "1 July 7:30 PM",
  },
];

export const NOTIFICATIONS = {
  heading: "Notifications",
  closeAltText: "close",
  loadAltText: "loader",
  avatarAltText: "avatar",
};

export const DAYS_OF_WEEK = new Map([
  ["Su", "SUN"],
  ["Mo", "MON"],
  ["Tu", "TUE"],
  ["We", "WED"],
  ["Th", "THU"],
  ["Fr", "FRI"],
  ["Sa", "SAT"],
]);

export const NO_FILES = "No files available";
export const SYNC = "Start by syncing your cloud storage to contiq";
export const SEARCH_RESULT_ALT = "Search results";
export const OTHER_DOCUMENTS_ALT = "Other documents";
export const OTHER_DOCUMENTS_IMG_1_ALT = "Search Results Image 1";
export const OTHER_DOCUMENTS_IMG_2_ALT = "Search Results Image 2";
export const SEARCH_RESULT = "Search results";
export const OTHER_DOCUMENTS_TXT = "Other documents";
export const DOCUMENT_IMG1_ALT = "power user img not found";
export const DOCUMENT_IMG2_ALT = "learn basics img not found";

export const passwordRegex =
  /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const SEARCH_PLACEHOLDER = "Search";
export const APP_TITLE = "CONTIQ";
export const NO_USER = "Not User Found";
export const SEARCHING = "pdf";
export const HELP = "help";
export const ADD_USER = "add users";
export const NOTIFICATION_TEXT = "notification";

export const CREATE_NEW_PASSWORD = {
  resetPasswordTitle: "Reset your password",
  resetPasswordSubtitle:
    "The verification mail will be sent to the mailbox please check it.",
  email: "Email",
  emailTextField: "Enter your email",
  emailErrorMessage: "Enter valid email",
  sendButton: "Send",
  createPasswordTitle: "Create new password",
  createPasswordSubtitle: "Enter new password below to change your password",
  password: "New password",
  confirmPassword: "Confirm new password",
  passwordTextField: "Enter new password",
  passwordErrorMessage: "Enter valid password",
  confirmPasswordTextField: "Re-enter password",
  resetButton: "Reset Password",
};

export const PRESENTATION_CARD = [
  {
    img: "profile-img",
    imgAlt: "profile image not found",
    name: "profile.pdf",
    icon: "pdf-icon",
    iconAlt: "icon not found",
    date: "2023-07-22",
  },
  {
    img: "contract-img",
    imgAlt: "contract agreement image not found",
    name: "Contract agreement.ppt",
    icon: "pdf-icon",
    iconAlt: "icon not found",
    date: "2023-04-19",
  },
];

export const PROGRESS_BAR_MODAL = "Uploading 1/1";

export const LOCAL_FILE_UPLOAD = {
  heading: "Drop your files here",
  message: "File length is zero",
  chooseButton: "Choose files",
  uploadButton: "Upload Files",
  mockFileType: "PDF",
  mockFilePath: "files/sample.pdf",
  mockAction: "uploaded",
  mockName: "Somnath",
};

export const DEFAULT_ZOOM = 0.85;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 1.5;
export const NAVIGATE_FILE = "/file";
export const PDF_LICENSE = "eIIdD68GXNVYsFcQbuJ9";
export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
export const SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";

export const UPLOAD_FILES_FROM_CLOUD_CONSTANTS = {
  firstModalTitle: "Upload files",
  driveFolders: "Drag media here to upload of connect an account",
  modalTitle: "Add files",
  filesSync: "Choose the folders to sync with contiq",
};

export const array = [
  {
    id: 1,
    name: "Company agreement.ppt",
    icon: Agreement,
    imageAlt: "Company Agreement Image",
    pdfIconAlt: "Pdf Icon Alt",
    createdAt: "2023-10-24T12:34:07",
    updatedAt: "2023-10-24T12:34:07",
  },
  {
    id: 2,
    name: "Company Profile.pdf",
    icon: Agreement,
    imageAlt: "Company Profile Image",
    pdfIconAlt: "Pdf Icon Alt",
    createdAt: "2023-10-24T12:34:07",
    updatedAt: "2023-10-24T12:34:07",
  },
  {
    id: 3,
    name: "Company transformation.ppt",
    icon: Agreement,
    createdAt: "2023-10-24T12:34:07",
    updatedAt: "2023-10-24T12:34:07",
  },
];

export const tabsOne = [
  { label: "All Files", disabled: false },
  { label: "Slides", disabled: false },
  { label: "Doc", disabled: true },
];

export const tabsTwo: ITabData[] = [
  { label: "Uploads", disabled: false },
  { label: "Cloud Storage", disabled: false },
];

export const MOCK_SERVER_URL = "https://bc130-ms.real-world.tk";
export const LOCAL_SERVER_URL = "http://localhost:8000";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const mockNotificationData = [
  {
    createdAt: "2023-11-07T00:57:11.075Z",
    action: "uploaded",
    userName: "Raju",
    fileName: "png2pdf.pdf",
    id: 1,
  },
  {
    createdAt: "2023-11-07T08:15:37.741Z",
    action: "uploaded",
    userName: "Raju",
    fileName: "png2pdf.pdf",
    id: 2,
  },
];

const date = new Date();
export const mockFileData = [
  {
    files: {
      fileId: "1",
      fileName: "Company agreement.pdf",
      fileType: "pdf",
      filePath: "./file-service/uploads/1/Zemoso.pdf",
      userId: 1,
      trashed: false,
      synced: true,
      createdOn: "2023-11-23T03:07:33.111+00:00",
      updatedOn: null,
      content: "pdf",
    },
  },
];

export const mockUserData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "Johndoe@2001",
    notificationCount: 0,
  },
];
export const FILES_PAGE_CONSTANTS = {
  pageHeader: "Files",
  addFilesButton: "Add files",
  addFilesIconAltText: "AddFilesIcon",
  fileTypePlaceholder: "File type",
  startDateLabel: "Start Date",
  endDateLabel: "End Date",
  publishSettingPlaceholder: "Publish Setting",
  publishSettingHeader: "Publish by",
  publishValueText: "Published by me",
  swapIconAltText: "SwapIcon",
  mostRevelantText: "Most relevant",
  chevronIconAltText: "ChevronIcon",
  toggleBoxAltText: "ToggleBox",
  notAvailableAltText: "NotAvailable",
  noFilesText: "No files available",
  consoleText: "Navigate to specific pdf file",
};

export const mockFilesResponseData = {
  files: [
    {
      fileId: "1",
      fileName: "Company agreement.pdf",
      fileType: "pdf",
      filePath: "./file-service/uploads/1/Zemoso.pdf",
      userId: 1,
      trashed: false,
      synced: false,
      createdOn: "2023-11-23T03:07:33.111+00:00",
      updatedOn: "2023-11-23T03:07:33.111+00:00",
      content: "",
    },
    {
      fileId: "2",
      fileName: "Software agreement.pdf",
      fileType: "pdf",
      filePath: "./file-service/uploads/1/Zemoso.pdf",
      userId: 1,
      trashed: false,
      synced: false,
      createdOn: "2023-11-23T03:07:33.111+00:00",
      updatedOn: "2023-11-23T03:07:33.111+00:00",
      content: "",
    },
    {
      fileId: "3",
      fileName: "Software agreement2.pdf",
      fileType: "pdf",
      filePath: "./file-service/uploads/1/Zemoso.pdf",
      userId: 1,
      trashed: false,
      synced: false,
      createdOn: "2023-11-23T03:07:33.111+00:00",
      updatedOn: "2023-11-23T03:07:33.111+00:00",
      content: "",
    },
    {
      fileId: "4",
      fileName: "Company Profile.pdf",
      fileType: "pdf",
      filePath: "./file-service/uploads/1/Zemoso.pdf",
      userId: 1,
      trashed: false,
      synced: false,
      createdOn: "2023-11-23T03:07:33.111+00:00",
      updatedOn: "2023-11-23T03:07:33.111+00:00",
      content: "",
    },
  ],
};

export const InitialFileDetails = {
  fileName: "sample.pdf",
  fileRender: "files/sample.pdf",
};

export const ROUTES = {
  ROOT: "/",
  HOME: "/home",
  SIGNUP: "/signup",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot",
  PDF_VIEWER: "/pdf",
  FILES_BROWSING: "/file",
  PDF_PAGE: "/file/:id/:name",
  SEARCH_RESULTS: "/:id/:label/:search",
  TYPELOGIN: "login",
  TYPESIGNIN: "",
};

export const REDIRECT_URL = "https://bc130-fe.real-world.tk/home";
export const PDF_REDIRECT_URL =
  "http://bc130-be.real-world.tk/api/v1/files/resource?filepath=./file-service/uploads";
