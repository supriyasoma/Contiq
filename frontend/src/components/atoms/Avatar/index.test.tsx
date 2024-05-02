import { render, screen } from "@testing-library/react";
import Avatar, { MuiAvatarProps } from ".";

describe("Avatar Component", () => {
  it("should render with specified props", () => {
    const src = "profile_image";
    const alt = "Avatar Alt Text";
    const style: React.CSSProperties = {
      border: "2px solid black",
      borderRadius: "50%",
    };
    const sx: MuiAvatarProps["sx"] = {
      width: 100,
      height: 100,
    };

    render(<Avatar src={src} alt={alt} style={style} sx={sx} />);
    const avatar = screen.getByAltText("Avatar Alt Text");
    expect(avatar).toBeInTheDocument();
    expect(avatar.tagName).toBe("IMG");
  });
});
