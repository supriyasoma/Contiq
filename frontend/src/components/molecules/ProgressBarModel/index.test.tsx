import React from "react";
import { render, screen, act } from "@testing-library/react";
import ProgressBarModal from ".";

describe("ProgressBarModal", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should render ProgressBarModal with initial progress", () => {
    const fileName = "example.pdf";
    render(<ProgressBarModal fileName={fileName} />);
    const progressBar = screen.getByTestId("progress-bar");

    expect(progressBar).toBeInTheDocument();

    const initialProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(initialProgress).toBe(10);
  });

  it("should reach full progress in ProgressBarModal", () => {
    const fileName = "example.pdf";
    render(<ProgressBarModal fileName={fileName} />);
    const progressBar = screen.getByTestId("progress-bar");

    expect(progressBar).toBeInTheDocument();

    const initialProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(initialProgress).toBe(10);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    const updatedProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(updatedProgress).toBe(20);

    act(() => {
      jest.advanceTimersByTime(1600);
    });

    const finalProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(finalProgress).toBe(100);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const afterFinalProgress = Number(
      progressBar.getAttribute("aria-valuenow")
    );

    expect(afterFinalProgress).toBe(100);
  });
});
