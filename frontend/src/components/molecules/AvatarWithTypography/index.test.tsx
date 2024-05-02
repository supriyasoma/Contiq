import React from "react";
import { render } from "@testing-library/react";
import NotificationCard from ".";
import avatar from "/public/assets/icons/avatar.svg";

describe("NotificationCard", () => {
  it("should render correctly", () => {
    const { getByText, getByAltText } = render(
      <NotificationCard
        fileName="company agreement.pdf"
        userAction="uploaded"
        dateTime="20 June 10:30 AM"
        avatarSrc={avatar}
        avatarAlt="Avatar"
        name="Vamsi"
      />
    );

    expect(getByText("Vamsi")).toBeInTheDocument();
    expect(getByText("has uploaded company agreement.pdf")).toBeInTheDocument();
    expect(getByText("20 June 10:30 AM")).toBeInTheDocument();
    expect(getByAltText("Avatar")).toBeInTheDocument();
  });
});
