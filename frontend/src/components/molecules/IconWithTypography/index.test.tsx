import { render } from "@testing-library/react";
import IconWithTypography from ".";

describe("IconWithTypography", () => {
  it("should render with default props", () => {
    render(
      <IconWithTypography
        iconSrc="path/to/icon.png"
        iconAlt="Icon Alt Text"
        textValue="Text Value"
        textVariant="body1"
      />
    );
  });

  it("should render with custom styles", () => {
    const containerStyles = { backgroundColor: "blue" };
    const iconStyles = { width: "50px" };
    const textStyles = { color: "red" };

    render(
      <IconWithTypography
        containerStyles={containerStyles}
        iconSrc="path/to/icon.png"
        iconAlt="Icon Alt Text"
        iconStyles={iconStyles}
        textValue="Text Value"
        textVariant="body1"
        textStyles={textStyles}
      />
    );
  });
});
