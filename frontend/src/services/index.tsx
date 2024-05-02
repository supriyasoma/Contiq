import {
  IFileFromLocalUpload,
  INotification,
} from "../utils/interfaces";
import api from "./api";
import userApi from "./UserAPI";

export const localUpload = async (data: IFileFromLocalUpload) => {
  try {
    const response = await api.post(`/file`, data);
    return response.data;
  } catch (error) {
    console.log("Error occurred while uploading the file:", error);
  }
};

export const fileData = async () => {
  try {
    const response = await api.get(`/files`);
    return response.data;
  } catch (error) {
    console.log("Error occurred while uploading the file:", error);
  }
};

export const getFilesBySearchKeyword = async (searchKey: string) => {
  try {
    const response = await api.get(`/files/search?searchKey=${searchKey}`);
    return response.data;
  } catch (error) {
    console.log("Error occurred while uploading the file:", error);
  }
};

export const notificationDetails = async (data: INotification) => {
  try {
    const response = await api.post(`/notifications`, data);
    return response.data;
  } catch (error) {
    console.log("Error occurred while uploading the notification:", error);
  }
};

export const fetchNotificationData = async () => {
  try {
    const response = await api.get(`/notifications`);
    return response.data;
  } catch (error) {
    console.log(
      "Error occurred while fetching the notification details:",
      error
    );
  }
};

export const updateNotificationCount = async (
  id: number,
  notificationCount: number
) => {
  try {
    await userApi.patch(`/users/${id}/update-notification`, {
      notificationCount: notificationCount,
    });
  } catch (error) {
    console.log("Error occurred while updating the notification count:", error);
  }
};

export const fetchFileByName = async (name: string) => {
  try {
    const response = await api.get(`/file?name=${name}`);
    return response.data;
  } catch (error) {
    console.log("Error occurred while fetching the user details:", error);
  }
};

export const addUser = async (
  email?: string,
  name?: string,
  password?: string
) => {
  try {
    const response = await userApi.post(`/users`, {
      email: email,
      name: name,
      password: password,
      notificationCount: 0,
    });
    return response.data;
  } catch (error) {
    console.log("Error occurred while fetching the user details:", error);
  }
};

export const checkEmail = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.log("Error occurred while fetching the user details:", error);
  }
};

export const fetchUserDataByEmail = async (email: string) => {
  try {
    const response = await userApi.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.log("Error occurred while fetching the user details:", error);
  }
};

export const updateUserPasswordByEmail = async (
  id: number,
  password: string
) => {
  try {
    const response = await api.patch(`/user/${id}`, {
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("Error occurred while fetching the user details:", error);
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const response = await userApi.post(`/users/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("Error occurred while uploading the notification:", error);
  }
};

export const updateUserPassword = async (id: number, password: string) => {
  try {
    const response = await userApi.patch(`/users/${id}/reset-password`, {
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("Error occurred while fetching the user details:", error);
  }
};
