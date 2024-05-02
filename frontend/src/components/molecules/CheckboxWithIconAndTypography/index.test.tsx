import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxWithIconAndTypography from ".";

const commonProps = {
  id: "1",
  fileName: "testFileName",
  selected: false,
  onClick: jest.fn(),
  width: "30%",
};

describe("CheckboxWithIconAndTypography", () => {
  it("should render component with provided fileName", () => {
    render(<CheckboxWithIconAndTypography {...commonProps} />);
    const fileNameElement = screen.getByText("testFileName");
    expect(fileNameElement).toBeInTheDocument();
  });

  it("should call onClick when Checkbox is clicked", () => {
    render(<CheckboxWithIconAndTypography {...commonProps} />);
    const customBoxElement = screen.getByRole("checkbox");
    fireEvent.click(customBoxElement);
    expect(commonProps.onClick).toHaveBeenCalled();
  });

  it("should display Checkbox as checked when selected is true", () => {
    const props = {
      ...commonProps,
      selected: true,
    };
    render(<CheckboxWithIconAndTypography {...props} />);
    const customBoxElement = screen.getByRole("checkbox");
    expect(customBoxElement).toBeChecked();
  });
});
