import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByAltText,
} from "@testing-library/react";
import Dropdown from ".";

describe("Dropdown", () => {
  const props = {
    options: ["Option1", "Option2", "Option3"],
    placeholder: "Select an option",
    header: "Header",
    value: "Option1",
    menuOpen: false,
    handleChange: jest.fn(),
    handleClear: jest.fn(),
    handleMenu: jest.fn(),
  };
  it("should render Dropdown component when menuOpen is false", () => {
    const { getByText, getByAltText } = render(
      <Dropdown {...props} value="" />
    );

    expect(getByText(props.placeholder)).toBeInTheDocument();
    const chevronIcon = getByAltText("ChevronIcon");
    expect(chevronIcon).toBeInTheDocument();

    const iconStyle = window.getComputedStyle(chevronIcon);
    expect(iconStyle.transform).not.toBe("rotate(180deg)");
  });

  it("should render Dropdown component when menuOpen is true", () => {
    const { getByText, getByAltText } = render(
      <Dropdown {...props} value="" menuOpen />
    );

    expect(getByText(props.placeholder)).toBeInTheDocument();

    const chevronIcon = getByAltText("ChevronIcon");
    expect(chevronIcon).toBeInTheDocument();

    const iconStyle = window.getComputedStyle(chevronIcon);
    expect(iconStyle.transform).toBe("rotate(180deg)");
  });

  it("should call handleClear function when clear icon is clicked", () => {
    render(<Dropdown {...props} />);

    fireEvent.click(screen.getByAltText("CloseIcon"));
    expect(props.handleClear).toHaveBeenCalled();
  });
});
