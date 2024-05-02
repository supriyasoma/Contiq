import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import HomeBody from "./";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Body", () => {
  const mockHomeData = [
    {
      id: 1,
      icon: "icon1.png",
      name: "File1.pdf",
      createdAt: "2023-08-25 12:34:07",
    },
  ];

  it("should render HomeBody component with recent files", () => {
    render(<HomeBody HomeData={mockHomeData} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Recent")).toBeInTheDocument();

    const fileCards = screen.queryAllByTestId("file-card");
    expect(fileCards).toHaveLength(1);
    fireEvent.doubleClick(screen.getByTestId("pdf-file"));
  });

  it("should render HomeBody component with no files", () => {
    render(<HomeBody HomeData={[]} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("Recent")).not.toBeInTheDocument();
    expect(screen.getByAltText("no-file-image")).toBeInTheDocument();
  });
});
