import { IProfile } from "./interfaces";

export const FILE_DATA = [
  {
    fileId: "1",
    fileName: "Company agreement.pdf",
    fileType: "pdf",
    filePath: "./file-service/uploads/1/Zemoso.pdf",
    userId: 1,
    trashed: false,
    synced: true,
    createdOn: "2023-11-23T03:07:33.111+00:00",
    updatedOn: null,
    content: "",
  },
  {
    fileId: "2",
    fileName: "Software agreement.pdf",
    fileType: "pdf",
    filePath: "./file-service/uploads/1/Zemoso.pdf",
    userId: 1,
    trashed: false,
    synced: true,
    createdOn: "2023-11-23T03:07:33.111+00:00",
    updatedOn: null,
    content: "",
  },
  {
    fileId: "3",
    fileName: "Software agreement2.pdf",
    fileType: "pdf",
    filePath: "./file-service/uploads/1/Zemoso.pdf",
    userId: 1,
    trashed: false,
    synced: true,
    createdOn: "2023-11-23T03:07:33.111+00:00",
    updatedOn: null,
    content: "",
  },
  {
    fileId: "4",
    fileName: "Company Profile.pdf",
    fileType: "pdf",
    filePath: "./file-service/uploads/1/Zemoso.pdf",
    userId: 1,
    trashed: false,
    synced: true,
    createdOn: "2023-11-23T03:07:33.111+00:00",
    updatedOn: null,
    content: "",
  },
];

export const profileData: IProfile = {
  displayName: "john Doe",
  email: "johndoe@example.com",
  phoneNumber: 1234567890,
  photoURL: "https://example.com/johndoe.jpg",
  providerId: "google",
  uid: "1234567890",
};
