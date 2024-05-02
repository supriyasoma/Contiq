import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { FoldersModal } from "./";
import { localUpload } from "../../../services";
import axios from "axios";

jest.mock("axios");

const date = "2023-11-08T09:17:31.198Z";
jest.mock("../../../services/api.tsx", () => ({
  post: jest.fn().mockImplementation((url) => {
    if (url.includes("file")) {
      return Promise.resolve({
        data: {
          name: "agreement.pdf",
          path: "files/sample.pdf",
          createdAt: new Date(date),
          updatedAt: new Date(date),
          type: "PDF",
          userId: 1,
          id: 1,
        },
      });
    }
  }),
}));

describe("FoldersModal", () => {
  const mockFileData = {
    name: "agreement.pdf",
    path: "files/sample.pdf",
    createdAt: new Date(date),
    updatedAt: new Date(date),
    type: "PDF",
    userId: 1,
    id: 1,
  };
  it("should render foldersModal correctly", () => {
    render(
      <FoldersModal
        modalTitle="Choose Folders"
        syncProgess={false}
        folderNames={["Folder 1", "Folder 2"]}
        fileNames={[
          {
            folderName: "Folder 1",
            fileNames: [
              { fileName: "File 1", fileId: "12" },
              { fileName: "File 2", fileId: "1231" },
            ],
          },
          {
            folderName: "Folder 2",
            fileNames: [
              { fileName: "File 3", fileId: "2134" },
              { fileName: "File 4", fileId: "12" },
            ],
          },
        ]}
      />
    );
    const modalTitle = screen.getByText("Choose Folders");
    expect(modalTitle).toBeInTheDocument();
  });

  it("should render syncProgress", () => {
    render(
      <FoldersModal
        modalTitle="Choose Folders"
        syncProgess={true}
        syncProgressBox={true}
      />
    );
    const syncProgress = screen.getByText("Sync in progress");
    expect(syncProgress).toBeInTheDocument();
  });

  it("should render with default props", () => {
    render(
      <FoldersModal
        modalTitle="Choose Folders"
        syncProgess={true}
        syncProgressBox={false}
        folderNames={["Folder 1", "Folder 2"]}
        fileNames={[
          {
            folderName: "Folder 1",
            fileNames: [
              { fileName: "File 1", fileId: "12" },
              { fileName: "File 2", fileId: "1231" },
            ],
          },
          {
            folderName: "Folder 2",
            fileNames: [
              { fileName: "File 3", fileId: "2134" },
              { fileName: "File 4", fileId: "12" },
            ],
          },
        ]}
      />
    );
    const radioButton = screen.getByTestId("entireDrive");
    fireEvent.click(radioButton);

    const folder1 = screen.getByText("Folder 1");
    const folder2 = screen.getByText("Folder 2");
    expect(folder2).toBeInTheDocument();
    fireEvent.click(folder1);
    const file1 = screen.getByText("File 1");
    expect(file1).toBeInTheDocument();
    const checkBox = screen.getAllByTestId("checkBox");
    checkBox.forEach((item) => {
      fireEvent.click(item);
    });
    fireEvent.click(checkBox[0]);
    fireEvent.click(screen.getByAltText("BackIcon"));
    fireEvent.click(screen.getByAltText("folders-close-icon"));
  });

  it("should click on Sync button and upload files", async () => {
    render(
      <FoldersModal
        modalTitle="Choose Folders"
        syncProgess={true}
        syncProgressBox={false}
        folderNames={["Folder 1", "Folder 2"]}
        fileNames={[
          {
            folderName: "Folder 1",
            fileNames: [
              { fileName: "File 1", fileId: "12" },
              { fileName: "File 2", fileId: "1231" },
            ],
          },
          {
            folderName: "Folder 2",
            fileNames: [
              { fileName: "File 3", fileId: "2134" },
              { fileName: "File 4", fileId: "12" },
            ],
          },
        ]}
      />
    );
    const folder1 = screen.getByText("Folder 1");
    const folder2 = screen.getByText("Folder 2");
    expect(folder2).toBeInTheDocument();
    fireEvent.click(folder1);
    const file1 = screen.getByText("File 1");
    expect(file1).toBeInTheDocument();
    const checkBox = screen.getAllByTestId("checkBox");
    checkBox.forEach((item) => {
      fireEvent.click(item);
    });
    fireEvent.click(checkBox[0]);
    fireEvent.click(screen.getByText("Sync"));
    axios.post = jest.fn().mockResolvedValue({ data: mockFileData });
    const response = await localUpload(mockFileData);
    expect(response).toEqual(mockFileData);
  });
});
