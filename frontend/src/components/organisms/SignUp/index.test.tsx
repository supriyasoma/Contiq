import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SignUp from ".";
import { ENTER_PASSWORD } from "../../../utils/constants";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { addUser } from "../../../services/index";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

jest.mock("axios");
jest.mock("@auth0/auth0-react");
const loginWithRedirect = jest.fn();
jest.mock("react-toastify");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

export const mockUserData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "Johndoe@2001",
    notificationCount: "0",
  },
];

export const mockPostUserData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    password: "Johndoe@2001",
    notificationCount: "0",
  },
];

jest.mock("../../../services/UserAPI.tsx", () => ({
  post: jest.fn().mockImplementation((url) => {
    if (url.includes(`/users`)) {
      return Promise.resolve({
        data: mockPostUserData,
      });
    }
  }),
}));

describe("Sign up", () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user,
      loginWithRedirect,
    });
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  });
  it("should enable the create account button when valid input is provided", async () => {
    const nameElement = screen.getByPlaceholderText("Kane Williamson");
    const emailElement = screen.getByPlaceholderText("kane@gmail.com");
    const passwordElement = screen.getByPlaceholderText("Create a password");
    const createAccountButton = screen.getByText("Create account");
    fireEvent.change(nameElement, { target: { value: "Mark Henry" } });
    fireEvent.change(emailElement, {
      target: { value: "john.doe@gmail.com" },
    });
    fireEvent.change(passwordElement, { target: { value: "Markhenry@123" } });
    expect(createAccountButton).not.toBeDisabled;
    fireEvent.click(createAccountButton);
  });

  it("should enable the create account button and adding user", async () => {
    const nameElement = screen.getByPlaceholderText("Kane Williamson");
    const emailElement = screen.getByPlaceholderText("kane@gmail.com");
    const passwordElement = screen.getByPlaceholderText("Create a password");
    const createAccountButton = screen.getByText("Create account");
    fireEvent.change(nameElement, { target: { value: "John Doe" } });
    fireEvent.change(emailElement, {
      target: { value: "john@gmail.com" },
    });
    fireEvent.change(passwordElement, { target: { value: "Johndoe@2001" } });
    expect(createAccountButton).not.toBeDisabled;
    fireEvent.click(createAccountButton);
    axios.post = jest.fn().mockResolvedValue(mockPostUserData);
    const response = await addUser(
      "john@gmail.com",
      "John Doe",
      "Johndoe@2001"
    );
    expect(response).toEqual(mockPostUserData);
  });

  it("should display an error message for invalid email input", () => {
    const emailInput = screen.getByPlaceholderText("kane@gmail.com");
    fireEvent.change(emailInput, { target: { value: "@kane.com" } });
    const emailErrorMessage = screen.getByText("Invalid email address");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  it("should clear password error", async () => {
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(passwordInput, { target: { value: "somnath" } });
    const errorText =  screen.queryByText(
      "password must contain 8 characters with at least one uppercase, one lowercase, one special character, and a number"
    );
    expect(errorText).toBeInTheDocument();

    fireEvent.change(passwordInput, {
      target: { value: "Password@2001" },
    });
    const clearedErrorText =  screen.queryByText(
      "password must contain 8 characters with at least one uppercase, one lowercase, one special character, and a number"
    );
    expect(clearedErrorText).not.toBeInTheDocument();
  });

  it("should clear email error", () => {
    const emailInput =  screen.getByPlaceholderText("kane@gmail.com");
    fireEvent.change(emailInput, { target: { value: "invalid.email" } });
    const errorText =  screen.queryByText("Invalid email address");
    expect(errorText).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { value: "somnathmore@gmail.com" },
    });
    const clearedErrorText =  screen.queryByText("Invalid email address");
    expect(clearedErrorText).not.toBeInTheDocument();
  });

  it("should clear name error", () => {
    const nameElement =  screen.getByPlaceholderText("Kane Williamson");

    fireEvent.change(nameElement, { target: { value: "Jo" } });
    const errorText =  screen.queryByText(
      "User name should have minimum 3 characters"
    );
    expect(errorText).toBeInTheDocument();

    fireEvent.change(nameElement, { target: { value: "Somnath" } });
    const clearedErrorText =  screen.queryByText(
      "User name should have minimum 3 characters"
    );
    expect(clearedErrorText).not.toBeInTheDocument();
  });

  it("should toggle password visibility when the eye icon is clicked", () => {
    const passwordInput = screen.getByPlaceholderText(ENTER_PASSWORD);
    const eyeIcon = screen.getByAltText("Image");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should navigate to the signin page when the sign-in button is clicked", () => {
    const signUpButton = screen.getByText("Sign In");
    fireEvent.click(signUpButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should redirect through google-auth", () => {
    const googleButton = screen.getByTestId("Google");
    fireEvent.click(googleButton);
    expect(loginWithRedirect).toHaveBeenCalledTimes(1);
  });
});
