import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ResetPasswordSuccess from ".";
import { RESET_PASSWORD } from "../../../utils/constants";

const mockHandleContinue = jest.fn();

describe("ResetPassword", () => {
  it("should render the component with correct props", () => {
    const { getByText, getByAltText } = render(
      <ResetPasswordSuccess handleContinue={mockHandleContinue} />
    );

    expect(getByText(RESET_PASSWORD.heading)).toBeInTheDocument();
    expect(getByText(RESET_PASSWORD.subHeading)).toBeInTheDocument();
    expect(getByAltText(RESET_PASSWORD.imageAltText)).toBeInTheDocument();
    expect(getByText(RESET_PASSWORD.buttonText)).toBeInTheDocument();
  });

  it("should call handleContinue when the button is clicked", () => {
    const { getByText } = render(
      <ResetPasswordSuccess handleContinue={mockHandleContinue} />
    );

    const button = getByText(RESET_PASSWORD.buttonText);

    fireEvent.click(button);
    expect(mockHandleContinue).toHaveBeenCalled();
  });
});
