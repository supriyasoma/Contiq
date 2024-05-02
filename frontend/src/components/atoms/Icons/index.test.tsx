import { screen, render, fireEvent } from "@testing-library/react";
import { Icon } from ".";
import { Home } from "../../../../public/assets/icons/home.svg";

test("should render Icon component", () => {
  render(<Icon src={Home} />);
});

test("should render Icon props alternate text component", () => {
  render(<Icon alt="an-image" src="" />);
  const altMessage = screen.getByAltText("an-image");
  expect(altMessage).toBeDefined();
  fireEvent.keyDown(screen.getByTestId("icon"), { key: "Enter" });
});
