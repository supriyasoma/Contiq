import { fireEvent, render, screen } from "@testing-library/react";
import InputField from "./index";
import Eye from "../../../../public/assets/icons/eye.svg";

describe("InputField", () => {
  it("should render InputField", () => {
    render(<InputField placeholder="John Doe" />);
    const Test = screen.getByTestId("input-field");
    expect(Test).toBeInTheDocument();
  });

  it("should render password InputField", () => {
    const handleClick = jest.fn();
    render(
      <InputField
        placeholder="John@example.com"
        type="password"
        adornment="end"
        src={Eye}
        handleClick={handleClick}
      />
    );
    const inputElement = screen.getByPlaceholderText("John@example.com");
    fireEvent.change(inputElement, { target: { value: "newPassword" } });
    expect(inputElement).toHaveValue("newPassword");
    const textFieldIcon = screen.getByAltText("Image");
    fireEvent.click(textFieldIcon);
    expect(handleClick).toHaveBeenCalled();
  });

  it("should render password InputField", () => {
    const handleClick = jest.fn();
    render(
      <InputField
        placeholder="John@example.com"
        type="password"
        adornment="start"
        src={Eye}
        handleClick={handleClick}
      />
    );
    const inputElement = screen.getByPlaceholderText("John@example.com");
    fireEvent.change(inputElement, { target: { value: "newPassword" } });
    expect(inputElement).toHaveValue("newPassword");
    const textFieldIcon = screen.getByTestId("icon");
    fireEvent.click(textFieldIcon);
    expect(handleClick).toHaveBeenCalled();
  });
});
