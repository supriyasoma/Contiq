import React from "react";
import { render } from "@testing-library/react";
import Home from ".";

describe("Home", () => {
  it("should render all sections correctly", () => {
    const { getByText } = render(
      <Home
        Header="Custom Header"
        Sidebar="Custom Sidebar"
        Content="Custom Content"
      />
    );

    expect(getByText("Custom Header")).toBeInTheDocument();
    expect(getByText("Custom Sidebar")).toBeInTheDocument();
    expect(getByText("Custom Content")).toBeInTheDocument();
  });

  it("should render default sections if not provided", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Header")).toBeInTheDocument();
    expect(getByText("Sidebar")).toBeInTheDocument();
    expect(getByText("Content")).toBeInTheDocument();
  });
});
