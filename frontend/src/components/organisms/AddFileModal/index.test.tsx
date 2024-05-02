import { render, screen, fireEvent } from "@testing-library/react";
import AddFileModal from ".";

describe("AddFileModal", () => {
  const AddFileModalProps = {
    UploadBody: <div>Upload Body</div>,
    CloudBody: <div>Cloud Body</div>,
    Content: <div>Content Body</div>,
    fileName: "New Agreement.pdf",
  };

  it("should render 'Add files' button correctly", () => {
    render(<AddFileModal tabs isUploaded {...AddFileModalProps} />);
    expect(screen.getByText("Add files")).toBeInTheDocument();
  });

  it("should open modal after clicking 'Add files' button", () => {
    render(
      <AddFileModal
        tabs
        isUploaded
        modalTitle="Upload Files"
        {...AddFileModalProps}
      />
    );

    fireEvent.click(screen.getByText("Add files"));
    expect(screen.getByAltText("BackIcon")).toBeInTheDocument();
    expect(screen.getByText("Upload Files")).toBeInTheDocument();
  });

  it("should display correct tabs in the modal", () => {
    render(<AddFileModal tabs isUploaded {...AddFileModalProps} />);

    fireEvent.click(screen.getByText("Add files"));
    expect(screen.getByText("Uploads")).toBeInTheDocument();
    expect(screen.getByText("Cloud Storage")).toBeInTheDocument();
  });

  it("should render 'Uploads' body when 'Uploads' tab is clicked", () => {
    render(<AddFileModal tabs isUploaded {...AddFileModalProps} />);

    fireEvent.click(screen.getByText("Add files"));
    fireEvent.click(screen.getByText("Uploads"));

    expect(screen.getByText("Upload Body")).toBeInTheDocument();
    expect(screen.queryByText("Cloud Body")).not.toBeInTheDocument();
    expect(screen.queryByText("Content Body")).not.toBeInTheDocument();
  });

  it("should render 'Cloud' body when 'Cloud Storage' tab is clicked", () => {
    render(<AddFileModal tabs isUploaded {...AddFileModalProps} />);

    fireEvent.click(screen.getByText("Add files"));
    fireEvent.click(screen.getByText("Cloud Storage"));

    expect(screen.getByText("Cloud Body")).toBeInTheDocument();
    expect(screen.queryByText("Upload Body")).not.toBeInTheDocument();
    expect(screen.queryByText("Content Body")).not.toBeInTheDocument();
  });

  it("should close modal when clicking 'Close' button", () => {
    render(<AddFileModal tabs isUploaded {...AddFileModalProps} />);

    fireEvent.click(screen.getByText("Add files"));
    fireEvent.click(screen.getByAltText("CloseIcon"));
    expect(screen.queryByText("Upload Files")).not.toBeInTheDocument();
  });

  it("should render Content body when tabs is false and when tabs is false", () => {
    render(<AddFileModal tabs={false} isUploaded {...AddFileModalProps} />);
    fireEvent.click(screen.getByText("Add files"));
    expect(screen.getByText("Content Body")).toBeInTheDocument();
  });

  it("should render the file upload component when isUploaded is false", () => {
    const props = {
      ...AddFileModalProps,
      tabs: false,
      isUploaded: false,
      fileName: "example-file.pdf",
    };
    render(<AddFileModal {...props} />);

    fireEvent.click(screen.getByText("Add files"));
    expect(screen.queryByAltText("BackIcon")).not.toBeInTheDocument();
    expect(screen.queryByAltText("CloseIcon")).not.toBeInTheDocument();
    expect(screen.queryByText("Upload Body")).not.toBeInTheDocument();
    expect(screen.getByText("Upload options")).toBeInTheDocument();
    expect(screen.getByText("example-file.pdf")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
  });
});
