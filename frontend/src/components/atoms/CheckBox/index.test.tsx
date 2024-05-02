import { render, fireEvent, screen } from "@testing-library/react";
import CheckBox from ".";

describe("CheckBox", () => {
  it("should render a default disabled checkbox with a label", () => {
    render(<CheckBox disabled label={<span>Remember me</span>} />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Remember me");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(label).toBeInTheDocument();
  });

  it("should render a custom checkbox with a label and toggle when clicked", () => {
    const onChangeMock = jest.fn();
    const { getByText, getByRole } = render(
      <CheckBox label={"Company overview"} onChange={onChangeMock} />
    );

    const checkbox = getByRole("checkbox");
    const label = getByText("Company overview");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeDisabled();
    expect(label).toBeInTheDocument();

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
