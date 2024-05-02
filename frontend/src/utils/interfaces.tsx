export interface HomeDataItem {
  fileId: string;
  fileName: string;
  fileType: string;
  filePath: string;
  userId: number;
  trashed: boolean;
  synced: boolean;
  createdOn: string;
  updatedOn: string;
  content: string;
}

export interface IFileFromLocalUpload {
  name: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  userId: number;
}

export interface INotificationType {
  fileName: string;
  userAction: string;
  dateTime: string;
  name: string;
}

export interface IProfile {
  displayName: string;
  email: string;
  phoneNumber: number;
  photoURL: string;
  providerId: string;
  uid: string;
}
export interface IFile {
  fileId: string;
  fileName: string;
  fileType: string;
  filePath: string;
  userId: number;
  trashed: boolean;
  synced: boolean;
  createdOn: string;
  updatedOn: string;
  content: string;
}

export interface INotification {
  createdAt: Date;
  action: string;
  userName: string;
  fileName: string;
}

export interface DriveFileData {
  fileId: string | null;
  fileName: string;
  fileType: string;
  filePath: string;
  userId: number;
  trashed: boolean;
  synced: boolean;
}