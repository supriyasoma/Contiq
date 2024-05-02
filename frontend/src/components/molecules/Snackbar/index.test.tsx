import React from "react";
import { render, screen } from "@testing-library/react";
import Snackbar from ".";

describe("Snackbar", () => {
  const handleCopy = jest.fn();
  const handleClosed = jest.fn();
  it("should render Snackbar with open state true", () => {
    render(
      <Snackbar
        topPosition="20px"
        open
        handleClick={handleCopy}
        handleClose={handleClosed}
      />
    );

    expect(screen.queryByRole("alert")).toBeInTheDocument();
    expect(screen.getByAltText("copyIcon")).toBeInTheDocument();
    expect(screen.getByAltText("completeIcon")).toBeInTheDocument();
    expect(screen.getByText("Text copied")).toBeInTheDocument();
    expect(screen.getByAltText("closeIcon")).toBeInTheDocument();
  });

  it("should render Snackbar with open state false", () => {
    render(
      <Snackbar
        topPosition="20px"
        open={false}
        handleClick={handleCopy}
        handleClose={handleClosed}
      />
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
