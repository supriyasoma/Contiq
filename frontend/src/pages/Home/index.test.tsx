import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomePage from ".";
import {
  APP_TITLE,
  mockFilesResponseData,
  mockUserData,
} from "../../utils/constants";

jest.mock("axios");

jest.mock("../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes("/files")) {
      return Promise.resolve({
        data: mockFilesResponseData,
      });
    }
    if (url.includes("user/1")) {
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

describe("Home Page", () => {
  it("should render Header component by default", () => {
    render(<HomePage />);
    expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
  });

  it("should render Sidebar screen correctly by default", () => {
    render(<HomePage />);
    expect(screen.getByText("Metrics")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});
