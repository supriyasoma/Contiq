import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ForgotPassword from ".";
import { CREATE_NEW_PASSWORD } from "../../utils/constants";
import axios from "axios";
import {
  fetchUserDataByEmail,
  updateUserPassword,
} from "../../services";
import { MemoryRouter } from "react-router";

jest.mock("axios");
const mockUserData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "Johndoe@2001",
    notificationCount: 0,
  },
];
const postUserDetails ={  
  id: 1,
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "Password@123",
  notificationCount: 0,
 }

jest.mock("../../services/UserAPI.tsx", () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes(`/users/john.doe@gmail.com`)) {
      return Promise.resolve({
        data: mockUserData,
      });
    }
  }),
  patch: jest.fn().mockImplementation((url) => {
    if (url.includes(`/users/1/reset-password`)) {
      return Promise.resolve({
        data: postUserDetails,
      });
    }
  }),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ForgotPassword", () => {
  beforeEach(()=>{
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
  })
  it("should render ForgotPassword component by default", () => {
    expect(
      screen.getByText(CREATE_NEW_PASSWORD.resetPasswordTitle)
    ).toBeInTheDocument();
  });

  it("should enable the send button when a valid email is entered but email is existed", async () => {
    const emailTextField = screen.getByPlaceholderText(
      CREATE_NEW_PASSWORD.emailTextField
    );

    expect(
      screen.getByText(CREATE_NEW_PASSWORD.resetPasswordTitle)
    ).toBeInTheDocument();

    fireEvent.change(emailTextField, {
      target: { value: "john.doe@gmail.com" },
    });

    expect(screen.getByText(CREATE_NEW_PASSWORD.sendButton)).not.toBeDisabled();

    fireEvent.click(screen.getByText(CREATE_NEW_PASSWORD.sendButton));

    axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
    const response = await fetchUserDataByEmail("john.doe@gmail.com");
    expect(response).toEqual(mockUserData);

    expect(
      await screen.findByText(CREATE_NEW_PASSWORD.createPasswordTitle)
    ).toBeInTheDocument();
  });

  it("should enable the send button when a valid email is entered but email is not existed", async () => {
    const emailTextField = screen.getByPlaceholderText(
      CREATE_NEW_PASSWORD.emailTextField
    );

    expect(
      screen.getByText(CREATE_NEW_PASSWORD.resetPasswordTitle)
    ).toBeInTheDocument();

    fireEvent.change(emailTextField, {
      target: { value: "test@gmail.com" },
    });

    expect(screen.getByText(CREATE_NEW_PASSWORD.sendButton)).not.toBeDisabled();

    fireEvent.click(screen.getByText(CREATE_NEW_PASSWORD.sendButton));

    axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
    const response = await fetchUserDataByEmail("test@gmail.com");
    expect(response).not.toEqual(mockUserData);
  });

  it("should disable the send button when an invalid email is entered", () => {
    const emailTextField = screen.getByPlaceholderText(
      CREATE_NEW_PASSWORD.emailTextField
    );

    expect(
      screen.getByText(CREATE_NEW_PASSWORD.resetPasswordTitle)
    ).toBeInTheDocument();

    fireEvent.change(emailTextField, { target: { value: "testgmail.com" } });

    expect(screen.getByText(CREATE_NEW_PASSWORD.sendButton)).toBeDisabled();
  });

  it("should successfully reset password with valid inputs", async () => {
    const emailTextField = screen.getByPlaceholderText(
      CREATE_NEW_PASSWORD.emailTextField
    );

    fireEvent.change(emailTextField, {
      target: { value: "john.doe@gmail.com" },
    });

    const sendButton = screen.getByText(CREATE_NEW_PASSWORD.sendButton);
    fireEvent.click(sendButton);
    axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
    const response = await fetchUserDataByEmail("john.doe@gmail.com");
    expect(response).toEqual(mockUserData);

    const passwordTextField = await screen.findByPlaceholderText(
      CREATE_NEW_PASSWORD.passwordTextField
    );

    expect(
      screen.getByText(CREATE_NEW_PASSWORD.createPasswordTitle)
    ).toBeInTheDocument();

    fireEvent.change(passwordTextField, { target: { value: "Password@123" } });

    const confirmPasswordTextField = screen.getByPlaceholderText(
      CREATE_NEW_PASSWORD.confirmPasswordTextField
    );

    fireEvent.change(confirmPasswordTextField, {
      target: { value: "Password@123" },
    });

    const resetPasswordButton = screen.getByText(
      CREATE_NEW_PASSWORD.resetButton
    );
    fireEvent.click(resetPasswordButton);

    axios.patch = jest.fn().mockResolvedValue({
      data: postUserDetails});
    const patchResponse = await updateUserPassword(1, "Password@123");
    expect(patchResponse).toEqual(postUserDetails);
    expect(await screen.findByText("Same as previous password")).toBeInTheDocument();
  });
});
