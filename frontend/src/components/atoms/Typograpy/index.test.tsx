import MuiTypography from ".";
import { render, screen } from "@testing-library/react";

describe("typography Testcases", () => {
  it("renders the text correctly", () => {
    const text = "Home";

    render(<MuiTypography text={text} />);

    const typographyElement = screen.getByTestId("Typography-component");
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveTextContent(text);
  });

  it("renders with the given variant", () => {
    const text = "somanth";
    const variant = "h1";
    render(<MuiTypography variant={variant} text={text} />);

    const typographyElement = screen.getByTestId("Typography-component");
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveTextContent(text);
    expect(typographyElement.tagName.toLowerCase()).toBe(variant);
  });

  it("applies custom styles via 'sx'", () => {
    const text = "somanth";
    const variant = "h1";
    const sxstyle = {
      color: "pink",
      fontSize: "20px",
    };
    render(<MuiTypography sx={sxstyle} variant={variant} text={text} />);

    const typographyElement = screen.getByTestId("Typography-component");
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveTextContent(text);
    expect(typographyElement.tagName.toLowerCase()).toBe(variant);
    expect(typographyElement).toHaveStyle(`color: ${sxstyle.color}`);
    expect(typographyElement).toHaveStyle(`font-size: ${sxstyle.fontSize}`);
  });
});
