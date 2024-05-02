import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import LocalFileUpload from ".";
import * as api from "../../../services/index";
import { mockFilesResponseData } from "../../../utils/constants";

jest.mock("axios");

const onFileUpload = jest.fn();
const onDuplicateFileUpload = jest.fn();

jest.mock("../../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes("files")) {
      return Promise.resolve({
        data: mockFilesResponseData,
      });
    }
  }),
}));

describe("LocalFileUpload", () => {
  beforeEach(() => {
    onFileUpload.mockClear();
    onDuplicateFileUpload.mockClear();
  });

  it("should display the default message to drop files", () => {
    render(
      <LocalFileUpload
        onFileUpload={onFileUpload}
        onDuplicateFileUpload={onDuplicateFileUpload}
      />
    );

    const defaultText = screen.getByText("Drop your files here");
    expect(defaultText).toBeInTheDocument();
  });

  it('should display the "Choose files" button when no file is selected', () => {
    render(
      <LocalFileUpload
        onFileUpload={onFileUpload}
        onDuplicateFileUpload={onDuplicateFileUpload}
      />
    );

    const chooseFilesButton = screen.getByText("Choose files");
    expect(chooseFilesButton).toBeInTheDocument();
  });

  it("should not select any files when the file input is cleared", async () => {
    const { queryByTestId } = render(
      <LocalFileUpload
        onFileUpload={onFileUpload}
        onDuplicateFileUpload={onDuplicateFileUpload}
      />
    );
    const inputFile = screen.getByTestId("file-drop");
    fireEvent.change(inputFile, { target: { files: [] } });

    await waitFor(() => expect(queryByTestId("upload-file")).toBeFalsy());
  });

  it('should display the "Upload Files" button and a existing file is selected', async () => {
    const { queryByTestId } = render(
      <LocalFileUpload
        onFileUpload={onFileUpload}
        onDuplicateFileUpload={onDuplicateFileUpload}
      />
    );

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

    expect(onDuplicateFileUpload).toHaveBeenCalledTimes(1);
  });
  it('should display the "Upload Files" button when a new file is selected', async () => {
    const { queryByTestId } = render(
      <LocalFileUpload
        onFileUpload={onFileUpload}
        onDuplicateFileUpload={onDuplicateFileUpload}
      />
    );

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

    const mockResponse = { name: "sample.pdf" };
    jest.spyOn(api, "localUpload").mockResolvedValue(mockResponse);

    act(() => {
      fireEvent.click(uploadFilesButton);
    });

    expect(onFileUpload).toHaveBeenCalledTimes(1);
  });
});
