import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./";
import {
  APP_TITLE,
  SEARCHING,
  SEARCH_PLACEHOLDER,
  mockFileData,
  mockUserData,
} from "../../../utils/constants";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { getFilesBySearchKeyword } from "../../../services";

jest.mock("axios");

jest.mock("../../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes(`/files`)) {
      return Promise.resolve({
        data: mockFileData,
      });
    }
    if (url.includes(`/files/search?searchKey=pdf`)) {
      return Promise.resolve({
        data: mockFileData,
      });
    }
    if (url.includes("user")) {
      return Promise.resolve({
        data: mockUserData,
      });
    }
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
  it("should render the header with the app title", () => {
    const appTitle = screen.getByText(APP_TITLE);
    expect(appTitle).toBeInTheDocument();
  });

  it("should render add user icon and help icon", () => {
    const addIcon = screen.getByAltText("add users");
    expect(addIcon).toBeInTheDocument();
    const helpIcon = screen.getByAltText("help");
    expect(helpIcon).toBeInTheDocument();
  });

  it("should handle search input correctly", () => {
    const searchInput = screen.getByPlaceholderText(
      SEARCH_PLACEHOLDER
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: SEARCHING } });
    expect(searchInput.value).toBe(SEARCHING);
  });

  it("should open and close the notification popover", () => {
    const notificationIcon = screen.getByAltText("notification");
    fireEvent.click(notificationIcon);
    const popover = screen.getByText("Notifications");
    expect(popover).toBeInTheDocument();
  });

  it("should handle notification bar click", () => {
    const notificationIcon = screen.getByAltText("notification");
    expect(notificationIcon).toBeInTheDocument();
    fireEvent.click(notificationIcon);
    const popover = screen.getByText("Notifications");
    expect(popover).toBeInTheDocument();
  });

  it("should open and close the logout popup when clicking on the user icon", () => {
    const userIcon = screen.getByAltText("avatar");
    expect(userIcon).toBeInTheDocument();
    fireEvent.click(userIcon);
    const emptyLogoutPopup = screen.getByAltText("AvatarArrowIcon");
    expect(emptyLogoutPopup).toBeInTheDocument();
    fireEvent.click(userIcon);
    expect(userIcon).not.toBeInTheDocument();
  });
});
