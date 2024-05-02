import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FileUpload from "./index";
const mockHandleCancel = jest.fn();
const mockHandleUpload = jest.fn();

const defaultProps = {
  uploaddocument: "Contractagreement.pdf",
  handleCancel: mockHandleCancel,
  handleUpload: mockHandleUpload
};

describe("FileUpload Component", () => {
  it("renders properly with props", () => {
    const { getByText } = render(<FileUpload {...defaultProps} />);
    expect(getByText("Contractagreement.pdf")).toBeInTheDocument();
  });

  it("calls handleCancel when Cancel button is clicked", () => {
    const { getByText } = render(<FileUpload {...defaultProps} />);
    const cancelButton = getByText("Cancel");

    fireEvent.click(cancelButton);
    expect(mockHandleCancel).toHaveBeenCalled();
  });

  it("calls handleUpload when Upload button is clicked", () => {
    const { getByText } = render(<FileUpload {...defaultProps} />);
    const uploadButton = getByText("Upload");

    fireEvent.click(uploadButton);
    expect(mockHandleUpload).toHaveBeenCalled();
  });
});
