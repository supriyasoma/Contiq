import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import NotificationCard from ".";
import { mockNotificationData } from "../../../utils/constants";

jest.mock("axios");
jest.mock("../../../services/api.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes("notification")) {
      return Promise.resolve({
        data: mockNotificationData,
      });
    }
  }),
}));

describe("NotificationCard", () => {
  const onClose = jest.fn();

  it("should render the component with loading indicator", () => {
    render(<NotificationCard onClose={onClose} />);
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("should render the component with notifications", async () => {
    render(<NotificationCard onClose={onClose} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    expect(screen.getByTestId("notification-list")).toBeInTheDocument();
  });

  it("should call the onClose callback when close icon is clicked", () => {
    render(<NotificationCard onClose={onClose} />);
    const closeIcon = screen.getByTestId("notication-close-button");
    fireEvent.click(closeIcon);
    expect(onClose).toHaveBeenCalled();
  });
});
