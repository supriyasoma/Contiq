import { render } from "@testing-library/react";
import AccountPage from ".";
import { EMAIL, SIGNUP } from "../../utils/constants";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("Account Page", () => {
  it("should render sign in screen correctly with type login", () => {
    const { getByText } = render(<AccountPage type="login" />);
    const signInInputId = getByText(EMAIL);
    expect(signInInputId).toBeInTheDocument();
  });

  it("should render sign up screen correctly with type signup", () => {
    const { getByText } = render(<AccountPage type="signup" />);
    const signUpInputId = getByText(SIGNUP);
    expect(signUpInputId).toBeInTheDocument();
  });
});
