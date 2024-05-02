import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import left from "/public/assets/images/leftContainer.png"
import SignInTemplate from ".";

describe("Login template", () => {
  test("should render the login template", () => {
    const { getByText } = render(
    <SignInTemplate image={left} />);
    const template = screen.getByTestId("login-template");
    expect(getByText("content")).toBeInTheDocument();
    expect(template).toBeInTheDocument();
  });
});
