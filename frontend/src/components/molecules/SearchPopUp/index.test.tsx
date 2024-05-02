import { render, fireEvent, screen } from "@testing-library/react";
import { SearchPopUp } from ".";

describe("SearchPopUp", () => {
  const mockProps = {
    currentWord: 1,
    searchedResultsList: [
      "Sample search result 1",
      "Sample search result 2",
      "Sample search result 3",
    ],
    pageOf: 1,
    numberOfPages: 5,
    openSnackBar: jest.fn(),
    closeSnackBar: jest.fn(),
    copy: false,
    searchedWord: "Search Word",
    fileName: "Sample File.pdf",
    upArrowClick: jest.fn(),
    downArrowClick: jest.fn(),
    isAccordionOpen: true,
    accordionClick: jest.fn(),
    matchedIndex: 0,
  };

  it("should render SearchPopUp component with accordion open", () => {
    render(<SearchPopUp {...mockProps} />);
    const accordion = screen.getByTestId("custom-accordion");
    expect(accordion).toBeInTheDocument();
  });

  it("should render SearchPopUp component with accordion closed", () => {
    render(
      <SearchPopUp
        {...mockProps}
        currentWord={3}
        isAccordionOpen={false}
        matchedIndex={1}
      />
    );
    const accordion = screen.getByTestId("custom-accordion");
    expect(accordion).toBeInTheDocument();
  });

  it("should trigger accordionClick function when accordion is clicked", () => {
    render(<SearchPopUp {...mockProps} matchedIndex={4} />);
    const accordion = screen.getByTestId("custom-accordion");
    fireEvent.click(accordion);
    expect(mockProps.accordionClick).toHaveBeenCalledTimes(1);
  });
});
