import axios from "axios";
import { DriveFileData } from "../utils/interfaces";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://bc130-be.real-world.tk/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

interface MetadataObject {
  userId: number;
  fileName?: string;
}

export const uploadFileFromLocal = async (
  file: File,
  metadataObject: MetadataObject
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("metadata", JSON.stringify(metadataObject));

  try {
    const response = await instance.post("/files", formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileFromDrive = async (
  metadataObject: DriveFileData
): Promise<any> => {
  try {
    const response = await instance.post("/files", {
      metadata: JSON.stringify(metadataObject),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
