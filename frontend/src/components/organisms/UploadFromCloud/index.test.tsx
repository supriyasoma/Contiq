import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { UploadFromCloud } from ".";
import { fileData } from "../../../services";
import axios from "axios";
import { mockFilesResponseData } from "../../../utils/constants";

jest.mock("axios");
jest.mock("gapi-script", () => {
  return {
    gapi: {
      load: jest.fn(),
    },
  };
});

jest.mock("../../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes("files")) {
      return Promise.resolve({
        data: mockFilesResponseData
      });
    }
  }),
}));

describe("UploadFromCloud", () => {
  const mockFileData = [
    {
      name: "agreement.pdf",
      path: "files/sample.pdf",
      createdAt: new Date(),
      updatedAt: new Date(),
      type: "PDF",
      userId: 1,
      id: 1,
    },
  ];

  it("renders the component", () => {
    render(<UploadFromCloud />);

    fireEvent.click(screen.getByText("Add files"));

    const uploadFiles = screen.getByText("Upload files");
    expect(uploadFiles).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cloud Storage"));
    fireEvent.click(screen.getByAltText("driveIcon"));

    const syncProgress = screen.getByText("Sync in progress");
    expect(syncProgress).toBeInTheDocument();
  });

  it('should display the modal pop-up when existing file is selected and cancel button is triggered', async () => {
    const { queryByTestId } = render(<UploadFromCloud />);
    fireEvent.click(screen.getByText("Add files"));
    axios.get = jest.fn().mockResolvedValue({ data: mockFileData });

    await fileData();

    const file = new File(["file contents"], "Company agreement.pdf", {
      type: "application/pdf",
    });

    const inputFile = screen.getByTestId("file-drop");

    act(() => {
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => expect(queryByTestId("upload-file")).toBeTruthy());

    const uploadFilesButton = screen.getByText("Upload Files");
    expect(uploadFilesButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(uploadFilesButton);
    });

    await waitFor(() =>
      expect(
        screen.getByText(
          "already exists in this location. Do you want to replace the existing file with a new version or keep both files?"
        )
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.getByText("Drop your files here")).toBeInTheDocument();
  });

  it('should display modalpop-up and select upload button when a existing file is selected', async () => {
    const { queryByTestId } = render(<UploadFromCloud />);
    fireEvent.click(screen.getByText("Add files"));
    axios.get = jest.fn().mockResolvedValue({ data: mockFileData });

    await fileData();

    const file = new File(["file contents"], "Company agreement.pdf", {
      type: "application/pdf",
    });

    const inputFile = screen.getByTestId("file-drop");

    act(() => {
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => expect(queryByTestId("upload-file")).toBeTruthy());

    const uploadFilesButton = screen.getByText("Upload Files");
    expect(uploadFilesButton).toBeInTheDocument();

    fireEvent.click(uploadFilesButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "already exists in this location. Do you want to replace the existing file with a new version or keep both files?"
        )
      ).toBeInTheDocument()
    );
    expect(screen.getByText("Upload")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Upload"));
  });
  
  it('should should show lodaer when a file is uploaded', async () => {
    const { queryByTestId } = render(<UploadFromCloud />);
    fireEvent.click(screen.getByText("Add files"));
    axios.get = jest.fn().mockResolvedValue({ data: mockFileData });

    await fileData();

    const file = new File(["file contents"], "sample.pdf", {
      type: "application/pdf",
    });

    const inputFile = screen.getByTestId("file-drop");

    act(() => {
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => expect(queryByTestId("upload-file")).toBeTruthy());

    const uploadFilesButton = screen.getByText("Upload Files");
    expect(uploadFilesButton).toBeInTheDocument();

    fireEvent.click(uploadFilesButton);

    expect(screen.getByTestId("Uploading-text")).toBeInTheDocument();
  });
});
