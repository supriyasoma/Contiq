import { fireEvent, render, screen } from "@testing-library/react";
import { FileCard } from ".";
import PDFImage from "../../../../public/assets/images/fileCard.svg";

describe("FileCard", () => {
  const handleClick = jest.fn();
  it("should render FileCard", () => {
    render(
      <FileCard
        fileName="Company agreement.pdf"
        pdfImage={PDFImage}
        handleDoubleClick={handleClick}
      />
    );
    const fileName = screen.getByText("Company agreement.pdf");
    expect(fileName).toBeInTheDocument();

    fireEvent.doubleClick(screen.getByTestId("pdf-file"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
