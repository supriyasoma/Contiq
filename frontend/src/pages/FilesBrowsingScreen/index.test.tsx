import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilesBrowsingScreen from ".";
import { mockFilesResponseData, mockUserData } from "../../utils/constants";
import { MemoryRouter } from "react-router";

jest.mock("axios");

jest.mock("../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes("/files")) {
      return Promise.resolve({
        data: mockFilesResponseData,
      });
    }
    if (url.includes("user")) {
      return Promise.resolve({
        data: mockUserData,
      });
    }
  }),
}));

jest.mock("gapi-script", () => {
  return {
    gapi: {
      load: jest.fn(),
    },
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("FilesBrowsingScreen", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FilesBrowsingScreen />
      </MemoryRouter>
    );
  });

  it("should render page correctly", async () => {
    const pageHeader = screen.getAllByText("Files");
    expect(pageHeader[1]).toBeInTheDocument();
  });

  it("should filter files by file type as PDF", async () => {
    const fileTypeDropdown = screen.getByText("File type");
    expect(fileTypeDropdown).toBeInTheDocument();
    userEvent.click(fileTypeDropdown);
    const option = await screen.findByText("PDF");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    expect(screen.getByText("Software agreement.pdf")).toBeInTheDocument();
    const closeIcon = await screen.findByAltText("CloseIcon");
    userEvent.click(closeIcon);
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });

  it("should filter files by file type as PPT", async () => {
    const fileTypeDropdown = screen.getByText("File type");
    userEvent.click(fileTypeDropdown);
    const option = await screen.findByText("PPT");
    userEvent.click(option);
    const notFoundText = await screen.findByText("No files available");
    expect(notFoundText).toBeInTheDocument();
    const closeIcon = await screen.findByAltText("CloseIcon");
    userEvent.click(closeIcon);
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });

  it("should filter files by file type as Image", async () => {
    const fileTypeDropdown = screen.getByText("File type");
    userEvent.click(fileTypeDropdown);
    const option = await screen.findByText("Image");
    userEvent.click(option);
    const notFoundText = await screen.findByText("No files available");
    expect(notFoundText).toBeInTheDocument();
    const closeIcon = await screen.findByAltText("CloseIcon");
    userEvent.click(closeIcon);
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });

  it("should filter files by publish setting as Published by me", async () => {
    const publishDropdown = screen.getByText("Publish Setting");
    userEvent.click(publishDropdown);
    const option = await screen.findByText("Published by me");
    userEvent.click(option);
    expect(screen.getByText("Company agreement.pdf")).toBeInTheDocument();
    const closeIcon = await screen.findByAltText("CloseIcon");
    userEvent.click(closeIcon);
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });

  it("should filter files by publish setting as Published by Sales team", async () => {
    const publishDropdown = screen.getByText("Publish Setting");
    userEvent.click(publishDropdown);
    const option = await screen.findByText("Published by Sales team");
    userEvent.click(option);
    const notFoundText = await screen.findByText("No files available");
    expect(notFoundText).toBeInTheDocument();
    const closeIcon = await screen.findByAltText("CloseIcon");
    userEvent.click(closeIcon);
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });

  it("should filter files by publish setting as Published by others", async () => {
    const publishDropdown = screen.getByText("Publish Setting");
    userEvent.click(publishDropdown);
    const option = await screen.findByText("Published by others");
    userEvent.click(option);
    const notFoundText = await screen.findByText("No files available");
    expect(notFoundText).toBeInTheDocument();
    const closeIcon = await screen.findByAltText("CloseIcon");
    userEvent.click(closeIcon);
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });

  it("should filter files by start and end date", async () => {
    const startDate = screen.getByText("Start Date");
    const endDate = screen.getByText("End Date");

    userEvent.click(startDate);

    const selectedDate = new Date(2023, 8, 25);
    userEvent.type(startDate, selectedDate.toISOString());

    userEvent.click(endDate);

    userEvent.type(endDate, selectedDate.toISOString());
    expect(
      await screen.findByText("Software agreement.pdf")
    ).toBeInTheDocument();
  });
});
