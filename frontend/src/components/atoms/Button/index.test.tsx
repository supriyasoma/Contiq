import { render, fireEvent, screen } from "@testing-library/react";
import { ButtonWithIcon, Default, Disabled } from "./index.stories";
import Button from ".";

describe("Button Component", () => {
  it("should renders the default button with the provided text", () => {
    render(<Default {...Default.args} />);
    const button = screen.getByText("Create account");
    expect(button).toBeInTheDocument();
  });

  it("should executes the provided onClick function when the default button is clicked", () => {
    const handleClick = jest.fn();
    render(<Default {...Default.args} onClick={handleClick} />);
    const button = screen.getByText("Create account");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("should renders the disabled button with the provided text", () => {
    render(<Disabled {...Disabled.args} />);
    const button = screen.getByText("Create account");
    expect(button).toBeInTheDocument();
  });

  it("should does not execute the onClick function when the disabled button is clicked", () => {
    const handleClick = jest.fn();
    render(<Disabled {...Disabled.args} onClick={handleClick} />);
    const button = screen.getByText("Create account");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should renders the 'AddFile' button with the provided text and start icon", () => {
    render(<ButtonWithIcon {...ButtonWithIcon.args} />);
    const button = screen.getByText("Add files");
    const startIcon = screen.getByAltText("Add Icon");
    expect(button).toBeInTheDocument();
    expect(startIcon).toBeInTheDocument();
  });

  test("renders an outlined button", () => {
    const { getByText } = render(
      <Button variant="outlined">Outlined Button</Button>
    );
    const button = getByText("Outlined Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background: transparent");
    expect(button).toHaveStyle("color: #FFFFFF");
    expect(button).toHaveStyle("border-color: #BFC4C8");
  });
});
