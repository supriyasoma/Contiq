import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SignIn from ".";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserDataByEmail } from "../../../services";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

jest.mock("axios");
jest.mock("@auth0/auth0-react");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const loginWithRedirect = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
const mockData = [
  {
    email: "test@gmail.com",
    name: "Test",
    password: "test@12345",
    notificationCount: "4",
    id: 1,
  },
];

export const mockPostUserData = [
  "eyJhbGciOiJIUzI1NiJ9BnEDlnCW4fIEjhaQm8DkDV0resYpHhWO7O3e5LDvesA"
];

jest.mock("../../../services/UserAPI.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes(`/users/test@gmail.com`)) {
      return Promise.resolve({
        data: mockData,
      });
    }
    if (url.includes(`/users/john@gmail.com`)) {
      return Promise.resolve({
        data: [],
      });
    }
  }),
  post: jest.fn().mockImplementation((url) => {
    if (url.includes(`/users/login`)) {
      return Promise.resolve({
        data: mockPostUserData,
      });
    }
  }),
}));

describe("SignIn Component", () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user,
      loginWithRedirect,
    });

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
  });

  it("should updates email state on input change", () => {
    const emailInput = screen.getByPlaceholderText(
      "john@example.com"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });
  jest.useFakeTimers();
  it("updates password state on input change", () => {
    const passwordInput = screen.getByPlaceholderText(
      "Create a password"
    ) as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(passwordInput.value).toBe("testpassword");
  });
  it("should display error message when email is invalid", () => {
    const emailInput = screen.getByPlaceholderText(
      "john@example.com"
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });

    expect(emailInput.value).toBeDefined();
  });

  test("should display error message when password is invalid", () => {
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(passwordInput, { target: { value: "invalidpass" } });
  });

  it("should clear password error", async () => {
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(passwordInput, { target: { value: "somnath" } });
    const errortext = screen.queryByText(
      "password must contain 8 characters with at least one uppercase, one lowercase, one special character, and a number"
    );
    expect(errortext).toBeInTheDocument();

    fireEvent.change(passwordInput, {
      target: { value: "Password@2001" },
    });
    const clearedErrorText = screen.queryByText(
      "password must contain 8 characters with at least one uppercase, one lowercase, one special character, and a number"
    );
    expect(clearedErrorText).not.toBeInTheDocument();
  });

  it("should clear email error", () => {
    const emailInput = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(emailInput, { target: { value: "invalid.email" } });
    const errorText = screen.queryByText("Invalid email address");
    expect(errorText).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "valid@gmail.com" } });
    const clearedErrorText = screen.queryByText("Invalid email address");
    expect(clearedErrorText).not.toBeInTheDocument();
  });

  it("should fire the text field events with existig users", async () => {
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    const signInButton = await screen.findAllByText("Sign In");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, {
      target: { value: "test@12345" },
    });
    signInButton.forEach((item) => {
      fireEvent.click(item);
    });
    axios.get = jest.fn().mockResolvedValue({ data: mockData });
    const response = await fetchUserDataByEmail("test@gmail.com");
    expect(response).toEqual(mockData);
  });

  it("should check existing valid password", async () => {
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    const signInButton = await screen.findAllByText("Sign In");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, {
      target: { value: "somnath@123" },
    });
    signInButton.forEach((item) => {
      fireEvent.click(item);
    });
    axios.get = jest.fn().mockResolvedValue({ data: mockData });
    const response = await fetchUserDataByEmail("test@gmail.com");
    expect(response).toEqual(mockData);
  });

  it("should fire the text field events with not existing user", async () => {
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    const signInButton = await screen.findAllByText("Sign In");
    fireEvent.change(emailInput, { target: { value: "john@gmail.com" } });
    fireEvent.change(passwordInput, {
      target: { value: "JhonDoe@password12" },
    });
    signInButton.forEach((item) => {
      fireEvent.click(item);
    });
    axios.get = jest.fn().mockResolvedValue([]);
    const response = await fetchUserDataByEmail("john@gmail.com");
    expect(response).toEqual([]);
  });

  it("should toggle password visibility when the eye icon is clicked", () => {
    const passwordInput = screen.getByPlaceholderText("Create a password");
    const eyeIcon = screen.getByAltText("Image");
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should navigate to the signup page when the sign-up button is clicked", () => {
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });

  it("should navigate to the Forgot Password Page when the forgot-password button is clicked", () => {
    const signUpButton = screen.getByText("Forgot password?");
    fireEvent.click(signUpButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/forgot");
  });

  it("should redirect through google-auth", () => {
    const googleButton = screen.getByTestId("Google");
    fireEvent.click(googleButton);
    expect(loginWithRedirect).toHaveBeenCalledTimes(1);
  });

  it("should fire the text field events with existig users", async () => {
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    const signInButton = screen.getByTestId("signin");
    fireEvent.change(emailInput, { target: { value: "soma@gmail.com" } });
    fireEvent.change(passwordInput, {
      target: { value: "JhonDoe@password" },
    });
    fireEvent.click(signInButton);
    axios.get = jest
      .fn()
      .mockRejectedValue(
        new Error("An error occurred while signing in. Please try again.")
      );
  });
});
