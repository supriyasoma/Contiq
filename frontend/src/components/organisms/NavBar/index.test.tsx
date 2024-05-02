import React from "react";
import { render, fireEvent , screen } from "@testing-library/react";
import SideBar from ".";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SideBar", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    );
  });

  it("should render with the default active item", () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should change the active item when Home is clicked", () => {
    const homeButton = screen.getByText("Home");
    fireEvent.click(homeButton);
    expect(homeButton).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });

  it("should change the active item when Files is clicked", () => {
    const filesButton = screen.getByText("Files");
    fireEvent.click(filesButton);
    expect(filesButton).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });
});
