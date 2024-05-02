import React from "react";
import { render, screen } from "@testing-library/react";
import NavItem from ".";
import home from "/public/assets/icons/home.svg";
import homeActive from "/public/assets/icons/homeActive.svg";

describe("NavItem", () => {
  it("should render the component with inactive state", () => {
    const props = {
      icon: home,
      text: "Home",
      activeSrc: homeActive,
      isActive: false,
    };

    render(<NavItem {...props} />);

    expect(screen.getByAltText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveStyle({
      color: "rgb(149, 149, 150)",
    });
  });

  it("should render the component with active state", () => {
    const props = {
      icon: home,
      text: "Home",
      activeSrc: homeActive,
      isActive: true,
    };

    render(<NavItem {...props} />);

    expect(screen.getByAltText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveStyle({
      color: "rgb(255, 255, 255)",
    });
  });
});
