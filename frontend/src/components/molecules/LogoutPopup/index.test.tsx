import { render, screen, fireEvent } from "@testing-library/react";
import LogoutPopup from ".";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const commonProps = {
  name: "John Doe",
  open: true,
  handleClick: jest.fn(),
  handleClose: jest.fn(),
};


const users = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

const mockNavigate = jest.fn();
jest.mock("@auth0/auth0-react");
const logout = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("@auth0/auth0-react");

describe("LogoutPopup", () => {

  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      users,
      logout,
    });
  });
  it("should render with name, avatar, and logout option", () => {
    render(
      <MemoryRouter>
        <LogoutPopup {...commonProps} />
      </MemoryRouter>
    );
    const avatarElement = screen.getByAltText("AvatarArrowIcon");
    const nameElement = screen.getByText("John Doe");
    const optionElement = screen.getByText("Logout");
    expect(avatarElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(optionElement).toBeInTheDocument();
  });

  it("should not render options when open is false", () => {
    render(<LogoutPopup {...commonProps} open={false} />);
    const optionElement = screen.queryByText("Logout");
    expect(optionElement).not.toBeInTheDocument();
  });

  it("should call handleClick when avatar is clicked", () => {
    render(
      <MemoryRouter>
        <LogoutPopup {...commonProps} />
      </MemoryRouter>
    );
    const avatarElement = screen.getByAltText("AvatarArrowIcon");
    fireEvent.click(avatarElement);
    expect(commonProps.handleClick).toHaveBeenCalled();
  });

  it("should call handleClose when logout option is clicked", () => {
    render(
      <MemoryRouter>
        <LogoutPopup {...commonProps} />
      </MemoryRouter>
    );
    const optionElement = screen.getByText("Logout");
    fireEvent.click(optionElement);
    expect(commonProps.handleClose).toHaveBeenCalled();
  });

  it("should navigate to /login when logout option is clicked", () => {
    render(
      <MemoryRouter>
        <LogoutPopup {...commonProps} />
      </MemoryRouter>
    );
    const optionElement = screen.getByText("Logout");
    fireEvent.click(optionElement);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
