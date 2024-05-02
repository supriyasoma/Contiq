import { fireEvent, render, screen } from "@testing-library/react";
import { CreateNewPassword } from ".";
import axios from "axios";
import { fetchUserDataByEmail } from "../../../services";

jest.mock("axios");
const mockUserData = 
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "Johndoe@2001",
    notificationCount: "0",
  }
jest.mock("../../../services/UserAPI.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes(`/users/john.doe@gmail.com`)) {
      return Promise.resolve({
        data: mockUserData,
      });
    }
  }),
}));

describe("CreateNewPassword", () => {
  const props = {
    handleResetPassword: jest.fn(),
  };
  beforeEach(() => {
    render(<CreateNewPassword {...props} />);
  });

  it("should check email validations", () => {
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);
    const emailTextField = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailTextField, { target: { value: "testgmail.com" } });
    fireEvent.change(emailTextField, { target: { value: "test@gmail.com" } });
    fireEvent.click(sendButton);
  });

  it("should check password validations", async () => {
    const emailTextField = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailTextField, {
      target: { value: "john.doe@gmail.com" },
    });
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);
    axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
    const response = await fetchUserDataByEmail("john.doe@gmail.com");
    expect(response).toEqual(mockUserData);
    const passwordTextField = await screen.findByPlaceholderText(
      "Enter new password"
    );
    fireEvent.change(passwordTextField, { target: { value: "Password123" } });
    fireEvent.change(passwordTextField, { target: { value: "Password@123" } });
    const confirmPasswordTextField =
      screen.getByPlaceholderText("Re-enter password");
    fireEvent.change(confirmPasswordTextField, {
      target: { value: "Password123" },
    });
    fireEvent.change(confirmPasswordTextField, {
      target: { value: "Password@123" },
    });
    const eyeIcon = screen.getAllByAltText("Image");
    expect(passwordTextField).toHaveAttribute("type", "password");
    fireEvent.click(eyeIcon[0]);
    expect(passwordTextField).toHaveAttribute("type", "text");
    fireEvent.click(eyeIcon[0]);
    expect(passwordTextField).toHaveAttribute("type", "password");

    expect(confirmPasswordTextField).toHaveAttribute("type", "password");
    fireEvent.click(eyeIcon[1]);
    expect(confirmPasswordTextField).toHaveAttribute("type", "text");
    fireEvent.click(eyeIcon[1]);
    expect(confirmPasswordTextField).toHaveAttribute("type", "password");

    const resetPasswordButton = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordButton);
  });

  it("should fetch user data by email when 'Send' button is clicked", async () => {
    const emailTextField = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailTextField, {
      target: { value: "test@gmail.com" },
    });
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);
    axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
    const response = await fetchUserDataByEmail("test@gmail.com");
    expect(response).not.toEqual(mockUserData);
  });
});
