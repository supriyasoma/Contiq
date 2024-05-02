import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tabs, { ITabData, TabsProps } from ".";

const tabsone: ITabData[] = [
  { label: "All Files", disabled: false },
  { label: "Slides", disabled: false },
  { label: "Doc", disabled: true },
];

const defaultProps: TabsProps = {
  tabs: tabsone,
  activeTabColor: "#8B3DFF",
  inactiveTabColor: "#959596",
  backgroundColor: "#F4F5F5",
  width: "100%",
  onTabSelect: jest.fn(),
};

describe("Tabs Component", () => {
  it("renders Tabs with the provided props", () => {
    const { getByText, getAllByRole } = render(<Tabs {...defaultProps} />);

    tabsone.forEach((tab) => {
      expect(getByText(tab.label)).toBeInTheDocument();
    });

    const tabButtons = getAllByRole("tab");
    fireEvent.click(tabButtons[1]);
    expect(defaultProps.onTabSelect).toHaveBeenCalledWith("Slides");
    fireEvent.click(tabButtons[0]);
    expect(defaultProps.onTabSelect).toHaveBeenCalledWith("All Files");
  });

  it("applies the correct styles", () => {
    const { container } = render(<Tabs {...defaultProps} />);
    const containerElement = container.querySelector(".MuiBox-root");

    expect(containerElement).toHaveStyle(
      `background-color: ${defaultProps.backgroundColor}`
    );
    expect(containerElement).toHaveStyle(`width: ${defaultProps.width}`);
    expect(containerElement).toHaveStyle("borderBottom: 2px solid gray300");
  });
});
